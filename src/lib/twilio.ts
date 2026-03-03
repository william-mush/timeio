import twilio from 'twilio';

// WARNING: This in-memory Map does NOT work on serverless (Vercel/Lambda).
// Each invocation gets a fresh process, so codes stored here will be lost
// between requests. To fix properly, store verification codes in the database.
// Currently SMS verification is not actively used in production (no verify
// endpoint consumes verifyCode), so this is left as a known limitation.
const VERIFICATION_CODE_TTL = 10 * 60 * 1000; // 10 minutes
const verificationCodes = new Map<string, { code: string; expires: number }>();

let cachedClient: ReturnType<typeof twilio> | null = null;

function getTwilioClient() {
  if (cachedClient) return cachedClient;
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
    return null;
  }
  cachedClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  return cachedClient;
}

export const sendVerificationCode = async (phoneNumber: string) => {
  const client = getTwilioClient();
  if (!client) {
    console.error('Twilio credentials not configured; cannot send verification code');
    return false;
  }

  if (!process.env.TWILIO_PHONE_NUMBER) {
    console.error('TWILIO_PHONE_NUMBER not configured; cannot send verification code');
    return false;
  }

  // Generate a random 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Store the code with expiration
    // NOTE: This will NOT persist across serverless invocations. See warning above.
    verificationCodes.set(phoneNumber, {
      code,
      expires: Date.now() + VERIFICATION_CODE_TTL
    });

    // Send SMS via Twilio
    await client.messages.create({
      body: `Your time.IO verification code is: ${code}`,
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER
    });

    return true;
  } catch (error) {
    console.error('Failed to send verification code:', error);
    return false;
  }
};

// NOTE: This will always return false on serverless if the verify request
// hits a different instance than the one that generated the code.
export const verifyCode = (phoneNumber: string, code: string) => {
  const storedData = verificationCodes.get(phoneNumber);

  if (!storedData) {
    return false;
  }

  if (Date.now() > storedData.expires) {
    verificationCodes.delete(phoneNumber);
    return false;
  }

  const isValid = storedData.code === code;

  if (isValid) {
    verificationCodes.delete(phoneNumber);
  }

  return isValid;
}; 