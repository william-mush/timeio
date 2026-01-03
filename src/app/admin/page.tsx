'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
    BarChart3,
    Users,
    Shield,
    TrendingUp,
    AlertCircle,
    CheckCircle,
    XCircle,
    LogOut,
    RefreshCcw,
    Clock
} from 'lucide-react'

interface AuthStats {
    summary: {
        totalEvents: number
        successRate: number
        uniqueUsers: number
        period: string
    }
    eventsByType: { type: string; count: number }[]
    eventsByDay: { date: string; count: number }[]
    errorBreakdown: { errorCode: string; count: number }[]
    recentEvents: {
        id: string
        type: string
        provider: string | null
        email: string | null
        errorCode: string | null
        createdAt: string
    }[]
    users: {
        totalUsers: number
        newUsersThisWeek: number
    }
}

const eventTypeConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    signin_success: { label: 'Sign In', color: 'bg-green-500', icon: <CheckCircle className="w-4 h-4" /> },
    signin_failure: { label: 'Failed', color: 'bg-red-500', icon: <XCircle className="w-4 h-4" /> },
    signout: { label: 'Sign Out', color: 'bg-gray-500', icon: <LogOut className="w-4 h-4" /> },
    signup: { label: 'New User', color: 'bg-blue-500', icon: <Users className="w-4 h-4" /> },
}

export default function AdminDashboard() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [stats, setStats] = useState<AuthStats | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [days, setDays] = useState(30)

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin?callbackUrl=/admin')
        }
    }, [status, router])

    useEffect(() => {
        if (status === 'authenticated') {
            fetchStats()
        }
    }, [status, days])

    const fetchStats = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch(`/api/admin/auth-stats?days=${days}`)
            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('You do not have admin access')
                }
                throw new Error('Failed to fetch statistics')
            }
            const data = await response.json()
            setStats(data.data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    if (status === 'loading' || (status === 'authenticated' && loading && !stats)) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="flex items-center gap-3 text-white">
                    <RefreshCcw className="w-6 h-6 animate-spin" />
                    <span>Loading dashboard...</span>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 max-w-md text-center">
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-white mb-2">Access Denied</h2>
                    <p className="text-red-300">{error}</p>
                    <button
                        onClick={() => router.push('/')}
                        className="mt-4 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Shield className="w-8 h-8 text-blue-400" />
                        <div>
                            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                            <p className="text-sm text-slate-400">Authentication Analytics</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <select
                            value={days}
                            onChange={(e) => setDays(parseInt(e.target.value))}
                            className="bg-slate-800 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
                        >
                            <option value={7}>Last 7 days</option>
                            <option value={30}>Last 30 days</option>
                            <option value={90}>Last 90 days</option>
                        </select>
                        <button
                            onClick={fetchStats}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {stats && (
                    <>
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <StatCard
                                title="Total Users"
                                value={stats.users.totalUsers.toLocaleString()}
                                subtitle={`+${stats.users.newUsersThisWeek} this week`}
                                icon={<Users className="w-6 h-6" />}
                                color="blue"
                            />
                            <StatCard
                                title="Auth Events"
                                value={stats.summary.totalEvents.toLocaleString()}
                                subtitle={stats.summary.period}
                                icon={<BarChart3 className="w-6 h-6" />}
                                color="purple"
                            />
                            <StatCard
                                title="Success Rate"
                                value={`${stats.summary.successRate}%`}
                                subtitle="Sign-in attempts"
                                icon={<TrendingUp className="w-6 h-6" />}
                                color={stats.summary.successRate > 90 ? 'green' : stats.summary.successRate > 70 ? 'yellow' : 'red'}
                            />
                            <StatCard
                                title="Active Users"
                                value={stats.summary.uniqueUsers.toLocaleString()}
                                subtitle={stats.summary.period}
                                icon={<CheckCircle className="w-6 h-6" />}
                                color="green"
                            />
                        </div>

                        {/* Charts Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {/* Events by Type */}
                            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Events by Type</h3>
                                <div className="space-y-3">
                                    {stats.eventsByType.map((event) => {
                                        const config = eventTypeConfig[event.type] || { label: event.type, color: 'bg-gray-500', icon: null }
                                        const maxCount = Math.max(...stats.eventsByType.map(e => e.count))
                                        const percentage = maxCount > 0 ? (event.count / maxCount) * 100 : 0

                                        return (
                                            <div key={event.type} className="space-y-1">
                                                <div className="flex items-center justify-between text-sm">
                                                    <div className="flex items-center gap-2 text-slate-300">
                                                        {config.icon}
                                                        <span>{config.label}</span>
                                                    </div>
                                                    <span className="text-white font-medium">{event.count.toLocaleString()}</span>
                                                </div>
                                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full ${config.color} rounded-full transition-all duration-500`}
                                                        style={{ width: `${percentage}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Error Breakdown */}
                            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Error Breakdown</h3>
                                {stats.errorBreakdown.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                                        <CheckCircle className="w-12 h-12 text-green-500 mb-2" />
                                        <p>No errors in this period!</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {stats.errorBreakdown.map((error) => (
                                            <div key={error.errorCode} className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                                <div className="flex items-center gap-2">
                                                    <AlertCircle className="w-4 h-4 text-red-400" />
                                                    <span className="text-slate-300 font-mono text-sm">{error.errorCode}</span>
                                                </div>
                                                <span className="text-red-400 font-medium">{error.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Activity Chart */}
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 mb-8">
                            <h3 className="text-lg font-semibold text-white mb-4">Daily Activity</h3>
                            <div className="h-48 flex items-end gap-1">
                                {stats.eventsByDay.slice(0, 30).reverse().map((day, idx) => {
                                    const maxCount = Math.max(...stats.eventsByDay.map(d => d.count))
                                    const height = maxCount > 0 ? (day.count / maxCount) * 100 : 0

                                    return (
                                        <div
                                            key={day.date}
                                            className="flex-1 group relative"
                                        >
                                            <div
                                                className="bg-blue-500 hover:bg-blue-400 rounded-t transition-all cursor-pointer"
                                                style={{ height: `${Math.max(height, 2)}%` }}
                                            />
                                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                {new Date(day.date).toLocaleDateString()}: {day.count} events
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-slate-500">
                                <span>{stats.eventsByDay.length > 0 ? new Date(stats.eventsByDay[stats.eventsByDay.length - 1]?.date).toLocaleDateString() : ''}</span>
                                <span>{stats.eventsByDay.length > 0 ? new Date(stats.eventsByDay[0]?.date).toLocaleDateString() : ''}</span>
                            </div>
                        </div>

                        {/* Recent Events */}
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Recent Events</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left text-sm text-slate-400 border-b border-slate-700">
                                            <th className="pb-3 font-medium">Type</th>
                                            <th className="pb-3 font-medium">User</th>
                                            <th className="pb-3 font-medium">Provider</th>
                                            <th className="pb-3 font-medium">Error</th>
                                            <th className="pb-3 font-medium">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700/50">
                                        {stats.recentEvents.map((event) => {
                                            const config = eventTypeConfig[event.type] || { label: event.type, color: 'bg-gray-500', icon: null }

                                            return (
                                                <tr key={event.id} className="text-sm">
                                                    <td className="py-3">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${event.type === 'signin_success' ? 'bg-green-500/20 text-green-400' :
                                                                event.type === 'signin_failure' ? 'bg-red-500/20 text-red-400' :
                                                                    event.type === 'signup' ? 'bg-blue-500/20 text-blue-400' :
                                                                        'bg-slate-500/20 text-slate-400'
                                                            }`}>
                                                            {config.icon}
                                                            {config.label}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 text-slate-300 font-mono text-xs">
                                                        {event.email || '—'}
                                                    </td>
                                                    <td className="py-3 text-slate-400">
                                                        {event.provider || '—'}
                                                    </td>
                                                    <td className="py-3">
                                                        {event.errorCode ? (
                                                            <span className="text-red-400 font-mono text-xs">{event.errorCode}</span>
                                                        ) : (
                                                            <span className="text-slate-500">—</span>
                                                        )}
                                                    </td>
                                                    <td className="py-3 text-slate-400 flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {new Date(event.createdAt).toLocaleString()}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    )
}

function StatCard({
    title,
    value,
    subtitle,
    icon,
    color
}: {
    title: string
    value: string
    subtitle: string
    icon: React.ReactNode
    color: 'blue' | 'purple' | 'green' | 'yellow' | 'red'
}) {
    const colorClasses = {
        blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400',
        purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400',
        green: 'from-green-500/20 to-green-600/10 border-green-500/30 text-green-400',
        yellow: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 text-yellow-400',
        red: 'from-red-500/20 to-red-600/10 border-red-500/30 text-red-400',
    }

    return (
        <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-6`}>
            <div className="flex items-center justify-between mb-4">
                <span className="text-slate-400 text-sm font-medium">{title}</span>
                <div className={colorClasses[color].split(' ').pop()}>{icon}</div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{value}</div>
            <div className="text-sm text-slate-400">{subtitle}</div>
        </div>
    )
}
