'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { US_CITIES, type USCity } from '@/data/us-cities';
import { Clock, Search, X, MapPin, Globe } from 'lucide-react';

interface Props {
    initialCities: USCity[];
}

// Live time display for a city
function CityTime({ timezone }: { timezone: string }) {
    const [time, setTime] = useState<string>('--:--');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const formatted = now.toLocaleTimeString('en-US', {
                timeZone: timezone,
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            });
            setTime(formatted);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [timezone]);

    return <span className="font-mono text-blue-600">{time}</span>;
}

export function USCitiesClient({ initialCities }: Props) {
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState<'search' | 'state' | 'timezone'>('search');

    const eligibleCities = useMemo(() =>
        initialCities.filter(c => c.population >= 24000),
        [initialCities]
    );

    // Get unique states sorted
    const states = useMemo(() =>
        Array.from(new Set(eligibleCities.map(c => c.state))).sort(),
        [eligibleCities]
    );

    // Get unique timezones
    const timezones = useMemo(() => {
        const tzMap: Record<string, { label: string; cities: USCity[] }> = {};
        eligibleCities.forEach(city => {
            if (!tzMap[city.timezone]) {
                const shortName = city.timezone.replace('America/', '').replace(/_/g, ' ');
                tzMap[city.timezone] = { label: shortName, cities: [] };
            }
            tzMap[city.timezone].cities.push(city);
        });
        return Object.entries(tzMap).sort((a, b) => b[1].cities.length - a[1].cities.length);
    }, [eligibleCities]);

    // Filter cities by search
    const filteredCities = useMemo(() => {
        if (!search.trim()) return [];
        const query = search.toLowerCase();
        return eligibleCities
            .filter(city =>
                city.city.toLowerCase().includes(query) ||
                city.state.toLowerCase().includes(query) ||
                city.state_code.toLowerCase().includes(query)
            )
            .slice(0, 20);
    }, [search, eligibleCities]);

    // Top cities by population
    const topCities = useMemo(() =>
        [...eligibleCities]
            .sort((a, b) => b.population - a.population)
            .slice(0, 16),
        [eligibleCities]
    );

    return (
        <div className="space-y-8">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search US cities..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 text-lg border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ backgroundColor: 'rgb(var(--bg-primary))', color: 'rgb(var(--text-primary))' }}
                />
                {search && (
                    <button
                        onClick={() => setSearch('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                )}
            </div>

            {/* Search Results */}
            {search && (
                <div className="max-w-2xl mx-auto">
                    {filteredCities.length > 0 ? (
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                            {filteredCities.map((city) => (
                                <Link
                                    key={city.id}
                                    href={`/us-cities/${city.id}`}
                                    className="flex items-center justify-between p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-5 h-5 text-blue-500" />
                                        <div>
                                            <span className="font-medium text-gray-900">{city.city}</span>
                                            <span className="text-gray-500 ml-2">{city.state_code}</span>
                                        </div>
                                    </div>
                                    <CityTime timezone={city.timezone} />
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            No cities found matching "{search}"
                        </div>
                    )}
                </div>
            )}

            {/* When not searching, show content */}
            {!search && (
                <>
                    {/* Top Cities Grid */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Major US Cities</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {topCities.map((city) => (
                                <Link
                                    key={city.id}
                                    href={`/us-cities/${city.id}`}
                                    className="group bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-blue-500" />
                                            <span className="font-semibold text-gray-900 group-hover:text-blue-600">
                                                {city.city}
                                            </span>
                                        </div>
                                        <span className="text-sm text-gray-500">{city.state_code}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <CityTime timezone={city.timezone} />
                                        <span className="text-xs text-gray-400">
                                            Pop: {(city.population / 1000).toFixed(0)}K
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Browse by State */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <MapPin className="w-6 h-6 text-gray-400" />
                            Browse by State
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                            {states.map((state) => {
                                const count = eligibleCities.filter(c => c.state === state).length;
                                const stateSlug = state.toLowerCase().replace(/\s+/g, '-');
                                return (
                                    <Link
                                        key={state}
                                        href={`/us-cities/state/${stateSlug}`}
                                        className="bg-white rounded-lg p-3 text-center border border-gray-100 hover:border-blue-300 hover:shadow-sm transition-all"
                                    >
                                        <div className="font-medium text-gray-900 text-sm truncate">{state}</div>
                                        <div className="text-xs text-gray-400">{count} cities</div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Browse by Time Zone */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <Globe className="w-6 h-6 text-gray-400" />
                            Browse by Time Zone
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {timezones.map(([tz, data]) => {
                                const tzSlug = tz.replace('America/', '').toLowerCase().replace(/_/g, '-');
                                return (
                                    <Link
                                        key={tz}
                                        href={`/us-cities/timezone/${tzSlug}`}
                                        className="bg-white rounded-xl p-4 border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all group"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-gray-900 group-hover:text-blue-600">
                                                {data.label} Time
                                            </span>
                                            <span className="text-sm text-gray-400">{data.cities.length} cities</span>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {data.cities.slice(0, 3).map(c => c.city).join(', ')}
                                            {data.cities.length > 3 && '...'}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
