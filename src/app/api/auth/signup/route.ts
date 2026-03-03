import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { logAuthEvent } from '@/lib/auth-events'

// Simple in-memory rate limiting: 5 attempts per 15 minutes per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);
    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
        return false;
    }
    entry.count++;
    return entry.count > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
    try {
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        const body = await request.json()
        const { email, password, phoneNumber, smsEnabled } = body

        // Basic validation
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            )
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: 'Password must be at least 8 characters long' },
                { status: 400 }
            )
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 409 }
            )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                phoneNumber: phoneNumber || null,
                smsEnabled: smsEnabled || false,
                name: email.split('@')[0], // Default name from email part
            }
        })

        // Log signup event
        await logAuthEvent({
            type: 'signup',
            provider: 'credentials',
            userId: user.id,
            email: user.email || undefined,
        })

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user

        return NextResponse.json(
            {
                success: true,
                message: 'User created successfully',
                user: userWithoutPassword
            },
            { status: 201 }
        )

    } catch (error) {
        console.error('[Signup] Error creating user:', error)

        await logAuthEvent({
            type: 'signin_failure',
            errorCode: 'SignupError',
            errorMsg: error instanceof Error ? error.message : 'Unknown error',
        })

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
