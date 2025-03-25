import { NextResponse } from 'next/server';
import { sendVerificationCode } from '@/lib/twilio';
import { isValidPhoneNumber } from 'libphonenumber-js';

export async function POST(request: Request) {
  try {
    const { phoneNumber } = await request.json();

    if (!phoneNumber || !isValidPhoneNumber(phoneNumber, 'US')) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    const success = await sendVerificationCode(phoneNumber);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to send verification code' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending verification code:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 