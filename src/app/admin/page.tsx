'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Shield, Users, LogIn, Activity, AlertTriangle, RefreshCw } from 'lucide-react';

interface AuthStat {
    count: number;
    provider?: string;
    type: string;
}

interface UserStat {
    totalUsers: number;
    activeLast24h: number;
    newLast24h: number;
}

interface DashboardData {
    signups: number;
    signins: number;
    failures: number;
    providerStats: AuthStat[];
    users: UserStat;
}

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin');
        } else if (status === 'authenticated') {
            fetchStats();
        }
    }, [status, router]);

    const fetchStats = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/admin/auth-stats?days=30');
            if (!res.ok) {
                if (res.status === 403) throw new Error('You are not authorized to view this page.');
                throw new Error('Failed to fetch stats');
            }
            const json = await res.json();
            if (json.success) {
                setData(json.data);
            } else {
                throw new Error(json.error || 'Unknown error');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (status === 'loading' || (loading && !data && !error)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8 max-w-md text-center">
                    <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h1 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">Access Denied</h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 md:p-12">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <Shield className="w-8 h-8 text-blue-600" />
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Authentication & User Statistics (Last 30 Days)</p>
                    </div>
                    <button
                        onClick={fetchStats}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors shadow-sm"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh Data
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Users */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">
                                +{data?.users.newLast24h} today
                            </span>
                        </div>
                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Users</h3>
                        <p className="text-3xl font-bold mt-1">{data?.users.totalUsers.toLocaleString()}</p>
                    </div>

                    {/* Sign Ups */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Sign Ups (30d)</h3>
                        <p className="text-3xl font-bold mt-1">{data?.signups.toLocaleString()}</p>
                    </div>

                    {/* Sign Ins */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                <LogIn className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Successful Logins (30d)</h3>
                        <p className="text-3xl font-bold mt-1">{data?.signins.toLocaleString()}</p>
                    </div>

                    {/* Failures */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                            </div>
                            {data && data.failures > 0 && (
                                <span className="text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-1 rounded-full">
                                    {(data.failures / (data.signins + data.failures) * 100).toFixed(1)}% rate
                                </span>
                            )}
                        </div>
                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Auth Failures (30d)</h3>
                        <p className="text-3xl font-bold mt-1">{data?.failures.toLocaleString()}</p>
                    </div>
                </div>

                {/* Provider Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold mb-4">Login Methods</h3>
                        <div className="space-y-4">
                            {data?.providerStats.map((stat, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-750 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <span className="capitalize font-medium">{stat.provider || 'Unknown'}</span>
                                        <span className="text-xs text-gray-500 uppercase px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">
                                            {stat.type.replace('_success', '').replace('signin', 'login')}
                                        </span>
                                    </div>
                                    <span className="font-bold">{stat.count}</span>
                                </div>
                            ))}
                            {data?.providerStats.length === 0 && (
                                <p className="text-gray-500 text-center py-4">No login data available yet.</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold mb-4">Current Status</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
                                <span className="text-gray-600 dark:text-gray-400">Admin User</span>
                                <span className="font-medium truncate max-w-[200px]">{session?.user?.email}</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
                                <span className="text-gray-600 dark:text-gray-400">Environment</span>
                                <span className="font-medium capitalize">{process.env.NODE_ENV}</span>
                            </div>
                            <div className="flex items-center justify-between pb-3">
                                <span className="text-gray-600 dark:text-gray-400">Active Users (24h)</span>
                                <span className="font-bold text-green-600">{data?.users.activeLast24h}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
