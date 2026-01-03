import prisma from '@/lib/prisma'

export type AuthEventType = 'signin_success' | 'signin_failure' | 'signout' | 'signup'

export interface AuthEventData {
    type: AuthEventType
    provider?: string
    userId?: string
    email?: string
    errorCode?: string
    errorMsg?: string
    userAgent?: string
    ipAddress?: string
    country?: string
}

/**
 * Log an authentication event to the database
 * This is fire-and-forget - errors are logged but don't block the auth flow
 */
export async function logAuthEvent(data: AuthEventData): Promise<void> {
    try {
        await prisma.authEvent.create({
            data: {
                type: data.type,
                provider: data.provider,
                userId: data.userId,
                email: data.email,
                errorCode: data.errorCode,
                errorMsg: data.errorMsg,
                userAgent: data.userAgent,
                ipAddress: data.ipAddress,
                country: data.country,
            },
        })
        console.log(`[AuthEvent] Logged: ${data.type}`, {
            provider: data.provider,
            email: data.email?.substring(0, 3) + '***'
        })
    } catch (error) {
        // Don't let analytics errors break the auth flow
        console.error('[AuthEvent] Failed to log event:', error)
    }
}

/**
 * Get auth statistics for the admin dashboard
 * Handles the case where the AuthEvent table may not exist yet
 */
export async function getAuthStats(days: number = 30) {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    try {
        const [
            totalEvents,
            eventsByType,
            recentEvents,
            errorBreakdown,
            uniqueUsers,
        ] = await Promise.all([
            // Total events count
            prisma.authEvent.count({
                where: { createdAt: { gte: startDate } },
            }),

            // Events grouped by type
            prisma.authEvent.groupBy({
                by: ['type'],
                _count: { type: true },
                where: { createdAt: { gte: startDate } },
            }),

            // Recent events (last 50)
            prisma.authEvent.findMany({
                take: 50,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    type: true,
                    provider: true,
                    email: true,
                    errorCode: true,
                    createdAt: true,
                },
            }),

            // Error breakdown
            prisma.authEvent.groupBy({
                by: ['errorCode'],
                _count: { errorCode: true },
                where: {
                    createdAt: { gte: startDate },
                    errorCode: { not: null },
                },
            }),

            // Unique users who signed in
            prisma.authEvent.groupBy({
                by: ['userId'],
                where: {
                    createdAt: { gte: startDate },
                    type: 'signin_success',
                    userId: { not: null },
                },
            }),
        ])

        // Calculate events by day using Prisma queries instead of raw SQL
        // Group recent events by date manually
        const eventsByDayMap = new Map<string, number>()
        const allRecentEvents = await prisma.authEvent.findMany({
            where: { createdAt: { gte: startDate } },
            select: { createdAt: true },
        })

        for (const event of allRecentEvents) {
            const dateKey = event.createdAt.toISOString().split('T')[0]
            eventsByDayMap.set(dateKey, (eventsByDayMap.get(dateKey) || 0) + 1)
        }

        const eventsByDay = Array.from(eventsByDayMap.entries())
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => b.date.localeCompare(a.date))

        // Calculate success rate
        const successCount = eventsByType.find(e => e.type === 'signin_success')?._count.type || 0
        const failureCount = eventsByType.find(e => e.type === 'signin_failure')?._count.type || 0
        const totalAttempts = successCount + failureCount
        const successRate = totalAttempts > 0 ? (successCount / totalAttempts) * 100 : 100

        return {
            summary: {
                totalEvents,
                successRate: Math.round(successRate * 100) / 100,
                uniqueUsers: uniqueUsers.length,
                period: `Last ${days} days`,
            },
            eventsByType: eventsByType.map(e => ({
                type: e.type,
                count: e._count.type,
            })),
            eventsByDay,
            errorBreakdown: errorBreakdown.map(e => ({
                errorCode: e.errorCode,
                count: e._count.errorCode,
            })),
            recentEvents: recentEvents.map(e => ({
                ...e,
                email: e.email ? e.email.substring(0, 3) + '***@***' : null, // Mask email
            })),
        }
    } catch (error) {
        console.error('[AuthEvent] Failed to get stats:', error)
        // Return empty stats if the table doesn't exist yet
        return {
            summary: {
                totalEvents: 0,
                successRate: 100,
                uniqueUsers: 0,
                period: `Last ${days} days`,
            },
            eventsByType: [],
            eventsByDay: [],
            errorBreakdown: [],
            recentEvents: [],
        }
    }
}

/**
 * Get total user count for dashboard
 */
export async function getUserStats() {
    // Query User table
    let totalUsers = 0
    let lastUserCreatedAt: string | null = null
    let lastUserEmail: string | null = null

    try {
        totalUsers = await prisma.user.count()

        // Get the most recently created user
        const lastUser = await prisma.user.findFirst({
            orderBy: { createdAt: 'desc' },
            select: {
                email: true,
                name: true,
                createdAt: true,
            },
        })

        if (lastUser) {
            lastUserCreatedAt = lastUser.createdAt.toISOString()
            lastUserEmail = lastUser.email ? lastUser.email.substring(0, 3) + '***' : null
        }
    } catch (error) {
        console.error('[AuthEvent] Failed to get user stats:', error)
    }

    // Query AuthEvent table separately - this might fail if table doesn't exist
    let newUsersThisWeek = 0
    try {
        newUsersThisWeek = await prisma.authEvent.count({
            where: {
                type: 'signup',
                createdAt: {
                    gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                },
            },
        })
    } catch (error) {
        console.error('[AuthEvent] Failed to get new users count (table may not exist):', error)
    }

    return {
        totalUsers,
        newUsersThisWeek,
        lastUserCreatedAt,
        lastUserEmail,
    }
}

