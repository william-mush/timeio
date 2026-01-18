import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiter for auth endpoints
// In production, consider using Redis for distributed rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10; // 10 requests per minute per IP

function getRateLimitKey(request: NextRequest): string {
    // Use X-Forwarded-For for Vercel, fallback to a default
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor?.split(',')[0]?.trim() || 'unknown';
    return ip;
}

function isRateLimited(key: string): { limited: boolean; remaining: number } {
    const now = Date.now();
    const record = rateLimitMap.get(key);

    // Clean up expired entries periodically
    if (rateLimitMap.size > 10000) {
        for (const [k, v] of Array.from(rateLimitMap.entries())) {
            if (now > v.resetTime) {
                rateLimitMap.delete(k);
            }
        }
    }

    if (!record || now > record.resetTime) {
        rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return { limited: false, remaining: MAX_REQUESTS - 1 };
    }

    if (record.count >= MAX_REQUESTS) {
        return { limited: true, remaining: 0 };
    }

    record.count++;
    return { limited: false, remaining: MAX_REQUESTS - record.count };
}

// Security headers to add to all responses
const securityHeaders = {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)',
    // CSP - allowing inline scripts for Next.js hydration, Google Analytics
    'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: blob: https: http:",
        "connect-src 'self' https://www.google-analytics.com https://api.openweathermap.org https://*.tile.openstreetmap.org",
        "frame-ancestors 'none'",
    ].join('; '),
};

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Rate limiting for auth endpoints
    if (
        pathname.startsWith('/api/auth/signup') ||
        pathname.startsWith('/api/auth/send-code') ||
        pathname === '/api/auth/callback/credentials'
    ) {
        const key = getRateLimitKey(request);
        const { limited, remaining } = isRateLimited(key);

        if (limited) {
            return new NextResponse(
                JSON.stringify({ error: 'Too many requests. Please try again later.' }),
                {
                    status: 429,
                    headers: {
                        'Content-Type': 'application/json',
                        'Retry-After': '60',
                        ...securityHeaders,
                    },
                }
            );
        }

        // Add rate limit headers to response
        const response = NextResponse.next();
        response.headers.set('X-RateLimit-Limit', MAX_REQUESTS.toString());
        response.headers.set('X-RateLimit-Remaining', remaining.toString());

        // Add security headers
        for (const [header, value] of Object.entries(securityHeaders)) {
            response.headers.set(header, value);
        }

        return response;
    }

    // Add security headers to all other responses
    const response = NextResponse.next();
    for (const [header, value] of Object.entries(securityHeaders)) {
        response.headers.set(header, value);
    }

    return response;
}

// Configure which paths trigger the middleware
export const config = {
    matcher: [
        // Apply to all routes except static files and images
        '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
    ],
};
