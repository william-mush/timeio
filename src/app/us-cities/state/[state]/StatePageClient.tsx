'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, ArrowLeft, MapPin } from 'lucide-react';
import type { USCity } from '@/data/us-cities';

interface Props {
    state: string;
    cities: USCity[];
}

function CityTime({ timezone }: { timezone: string }) {
    const [time, setTime] = useState<string>('--:--:--');
    const [date, setDate] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-US', {
                timeZone: timezone,
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            });
            const dateStr = now.toLocaleDateString('en-US', {
                timeZone: timezone,
                weekday: 'short',
                month: 'short',
                day: 'numeric',
            });
            setTime(timeStr);
            setDate(dateStr);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [timezone]);

    return (
        <div className="text-right">
            <div className="font-mono text-lg font-semibold text-blue-600">{time}</div>
            <div className="text-xs text-gray-400">{date}</div>
        </div>
    );
}

export function StatePageClient({ state, cities }: Props) {
    const sortedCities = [...cities].sort((a, b) => b.population - a.population);

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
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <MapPin className="w-8 h-8 text-blue-500" />
                        <h1 className="text-3xl font-bold text-gray-900">
                            {state}
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        Current local time in {cities.length} cities across {state}
                    </p>
                </div>

                {/* Cities List with Live Times */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-[1fr,auto] gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
                        <div>City</div>
                        <div>Current Time</div>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {sortedCities.map((city) => (
                            <Link
                                key={city.id}
                                href={`/us-cities/${city.id}`}
                                className="grid grid-cols-[1fr,auto] gap-4 p-4 hover:bg-gray-50 transition-colors items-center"
                            >
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        <span className="font-medium text-gray-900">{city.city}</span>
                                        {city.county && (
                                            <span className="text-sm text-gray-400">({city.county})</span>
                                        )}
                                    </div>
                                    <div className="text-sm text-gray-500 ml-6">
                                        Pop: {city.population.toLocaleString()}
                                    </div>
                                </div>
                                <CityTime timezone={city.timezone} />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Timezone Info */}
                <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                    <h2 className="font-semibold text-gray-900 mb-2">Time Zone Coverage</h2>
                    <p className="text-sm text-gray-600">
                        Cities in {state} may span multiple time zones. Each city shows its accurate local time
                        based on its specific timezone.
                    </p>
                </div>
            </div>
        </div>
    );
}
