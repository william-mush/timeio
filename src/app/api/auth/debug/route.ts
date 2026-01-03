import { NextResponse } from 'next/server'

/**
 * Diagnostic endpoint to check NextAuth configuration
 * GET /api/auth/debug
 * 
 * Returns status of environment variables (without exposing secrets)
 * and helpful debugging information.
 */
export async function GET() {
    const diagnostics = {
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        config: {
            GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
                ? `Set (${process.env.GOOGLE_CLIENT_ID.substring(0, 10)}...)`
                : 'MISSING',
            GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
                ? 'Set (hidden)'
                : 'MISSING',
            NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'MISSING',
            NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET
                ? 'Set (hidden)'
                : 'MISSING',
            DATABASE_URL: process.env.DATABASE_URL
                ? `Set (${process.env.DATABASE_URL.split('@')[1]?.split('/')[0] || 'hidden'})`
                : 'MISSING',
        },
        expectedCallbackUrl: process.env.NEXTAUTH_URL
            ? `${process.env.NEXTAUTH_URL}/api/auth/callback/google`
            : 'Cannot determine - NEXTAUTH_URL not set',
        issues: [] as string[],
        recommendations: [] as string[],
    }

    // Check for common issues
    if (!process.env.GOOGLE_CLIENT_ID) {
        diagnostics.issues.push('GOOGLE_CLIENT_ID is not set')
        diagnostics.recommendations.push('Set GOOGLE_CLIENT_ID in your environment variables')
    }

    if (!process.env.GOOGLE_CLIENT_SECRET) {
        diagnostics.issues.push('GOOGLE_CLIENT_SECRET is not set')
        diagnostics.recommendations.push('Set GOOGLE_CLIENT_SECRET in your environment variables')
    }

    if (!process.env.NEXTAUTH_URL) {
        diagnostics.issues.push('NEXTAUTH_URL is not set - this commonly causes OAuthSignin errors')
        diagnostics.recommendations.push('Set NEXTAUTH_URL to your production URL (e.g., https://time.io)')
    }

    if (!process.env.NEXTAUTH_SECRET) {
        diagnostics.issues.push('NEXTAUTH_SECRET is not set - sessions may not persist')
        diagnostics.recommendations.push('Generate a secret with: openssl rand -base64 32')
    }

    if (process.env.NEXTAUTH_URL && !process.env.NEXTAUTH_URL.startsWith('https://')) {
        if (process.env.NODE_ENV === 'production') {
            diagnostics.issues.push('NEXTAUTH_URL should use HTTPS in production')
            diagnostics.recommendations.push('Update NEXTAUTH_URL to use https://')
        }
    }

    // Add Google Console reminder
    diagnostics.recommendations.push(
        `Ensure "${diagnostics.expectedCallbackUrl}" is added to Authorized redirect URIs in Google Cloud Console`
    )

    const hasIssues = diagnostics.issues.length > 0

    return NextResponse.json({
        status: hasIssues ? 'issues_found' : 'ok',
        ...diagnostics,
    }, {
        status: hasIssues ? 500 : 200,
    })
}
