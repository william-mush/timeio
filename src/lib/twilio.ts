import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const VERIFICATION_CODE_TTL = 10 * 60 * 1000; // 10 minutes
const verificationCodes = new Map<string, { code: string; expires: number }>();

export const sendVerificationCode = async (phoneNumber: string) => {
  // Generate a random 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  
  try {
    // Store the code with expiration
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