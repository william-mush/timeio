import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getAuthStats, getUserStats } from '@/lib/auth-events'

// Admin emails that can access the dashboard
// Falls back to default admins if env var not set
const DEFAULT_ADMIN_EMAILS = ['williammushkin@gmail.com', 'w@the.com']
const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(',') || DEFAULT_ADMIN_EMAILS

/**
 * GET /api/admin/auth-stats
 * Returns authentication statistics for the admin dashboard
 * Requires admin authentication
 */
export async function GET(request: NextRequest) {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is an admin
    const isAdmin = ADMIN_EMAILS.includes(session.user.email)

    if (!isAdmin) {
        return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
    }

    // Get the time period from query params (default 30 days)
    const searchParams = request.nextUrl.searchParams
    const days = parseInt(searchParams.get('days') || '30', 10)

    try {
        const [authStats, userStats] = await Promise.all([
            getAuthStats(days),
            getUserStats(),
        ])

        return NextResponse.json({
            success: true,
            data: {
                ...authStats,
                users: userStats,
            },
        })
    } catch (error) {
        console.error('[Admin] Failed to get auth stats:', error)
        return NextResponse.json(
            { error: 'Failed to fetch statistics' },
            { status: 500 }
        )
    }
}
