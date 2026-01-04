'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, ArrowLeft, Globe } from 'lucide-react';
import type { USCity } from '@/data/us-cities';

interface Props {
    timezone: string;
    tzLabel: string;
    cities: USCity[];
}

function LiveClock({ timezone }: { timezone: string }) {
    const [time, setTime] = useState<string>('--:--:--');
    const [date, setDate] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', {
                timeZone: timezone,
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            }));
            setDate(now.toLocaleDateString('en-US', {
                timeZone: timezone,
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            }));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [timezone]);

    return (
        <div className="text-center py-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl mb-8">
            <div className="text-6xl font-mono font-bold text-blue-600 mb-2">{time}</div>
            <div className="text-lg text-gray-600">{date}</div>
        </div>
    );
}

export function TimezonePageClient({ timezone, tzLabel, cities }: Props) {
    const sortedCities = [...cities].sort((a, b) => b.population - a.population);

    // Group by state
    const byState: Record<string, USCity[]> = {};
    sortedCities.forEach(city => {
        if (!byState[city.state]) byState[city.state] = [];
        byState[city.state].push(city);
    });
    const statesSorted = Object.keys(byState).sort();

    return (
        <div className="page-container">
            <div className="content-container max-w-4xl mx-auto">
                {/* Back Link */}
                <Link
                    href="/us-cities"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to US Cities
                </Link>

                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Globe className="w-8 h-8 text-blue-500" />
                        <h1 className="text-3xl font-bold text-gray-900">
                            {tzLabel} Time Zone
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        Current time and {cities.length} cities in the {tzLabel} time zone
                    </p>
                </div>

                {/* Live Clock */}
                <LiveClock timezone={timezone} />

                {/* Cities by State */}
                <div className="space-y-6">
                    {statesSorted.map(state => (
                        <div key={state}>
                            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <span>{state}</span>
                                <span className="text-sm font-normal text-gray-400">
                                    ({byState[state].length} cities)
                                </span>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                {byState[state].map(city => (
                                    <Link
                                        key={city.id}
                                        href={`/us-cities/${city.id}`}
                                        className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all"
                                    >
                                        <Clock className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                        <div className="min-w-0">
                                            <div className="font-medium text-gray-900 truncate">{city.city}</div>
                                            <div className="text-xs text-gray-400">
                                                Pop: {(city.population / 1000).toFixed(0)}K
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info */}
                <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                    <h2 className="font-semibold text-gray-900 mb-2">About {tzLabel} Time</h2>
                    <p className="text-sm text-gray-600">
                        The {tzLabel} time zone covers parts of {statesSorted.length} states with {cities.length} major cities.
                        All cities shown share the same current time.
                    </p>
                </div>
            </div>
        </div>
    );
}
