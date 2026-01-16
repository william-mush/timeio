'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { WorldCity } from '@/data/world-cities';
import { Clock, MapPin, Users, Calendar, ArrowLeft, Globe, Building, ArrowLeftRight } from 'lucide-react';

interface WorldCityTimeClientProps {
    city: WorldCity;
    children?: React.ReactNode;
}

export function WorldCityTimeClient({ city, children }: WorldCityTimeClientProps) {
    const [currentTime, setCurrentTime] = useState<Date>(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date, timezone: string) => {
        try {
            return new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            }).format(date);
        } catch {
            return date.toLocaleTimeString();
        }
    };

    const formatDate = (date: Date, timezone: string) => {
        try {
            return new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }).format(date);
        } catch {
            return date.toLocaleDateString();
        }
    };

    const getPopulationLabel = () => {
        if (city.population >= 10000000) return 'Megacity';
        if (city.population >= 5000000) return 'Major Metro';
        if (city.population >= 1000000) return 'Large City';
        if (city.population >= 500000) return 'Medium City';
        return 'City';
    };

    const timezoneDisplay = city.timezone.split('/').pop()?.replace(/_/g, ' ') || city.timezone;

    // Calculate UTC offset
    const getUTCOffset = () => {
        try {
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: city.timezone,
                timeZoneName: 'shortOffset',
            });
            const parts = formatter.formatToParts(new Date());
            const offsetPart = parts.find(p => p.type === 'timeZoneName');
            return offsetPart?.value || '';
        } catch {
            return '';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Breadcrumb */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <nav className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>•</span>
                        <Link href="/world-cities" className="hover:text-blue-600 transition-colors">World Cities</Link>
                        <span>•</span>
                        <span className="text-gray-900 font-medium">{city.city}, {city.country}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Hero Section */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                        <Globe className="w-4 h-4" />
                        {city.continent}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                        Current Time in {city.city}
                    </h1>
                    <p className="text-xl text-gray-600">
                        {city.country}
                    </p>
                </div>

                {/* Mobile Weather Widget (injected via children) */}
                {children}

                {/* Main Time Display */}
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 mb-8 text-center border border-gray-100">
                    <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Clock className="w-4 h-4" />
                        Live Time • {getUTCOffset()}
                    </div>

                    <div className="text-6xl md:text-7xl font-mono font-light text-gray-800 mb-4 tracking-tight">
                        {formatTime(currentTime, city.timezone)}
                    </div>

                    <div className="flex items-center justify-center gap-2 text-lg text-gray-600 mb-2">
                        <Calendar className="w-5 h-5" />
                        {formatDate(currentTime, city.timezone)}
                    </div>

                    <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
                        <Globe className="w-4 h-4" />
                        {city.timezone}
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Population */}
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-50 rounded-lg">
                                <Users className="w-5 h-5 text-purple-600" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900">Population</h2>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Population:</span>
                                <span className="font-semibold">{city.population.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">City Type:</span>
                                <span className="font-semibold">{getPopulationLabel()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Continent:</span>
                                <span className="font-semibold">{city.continent}</span>
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <MapPin className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900">Location</h2>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Country:</span>
                                <span className="font-semibold">{city.country}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Coordinates:</span>
                                <span className="font-semibold text-sm">
                                    {Math.abs(city.coordinates[1]).toFixed(4)}°{city.coordinates[1] >= 0 ? 'N' : 'S'},
                                    {Math.abs(city.coordinates[0]).toFixed(4)}°{city.coordinates[0] >= 0 ? 'E' : 'W'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Time Zone:</span>
                                <span className="font-semibold text-sm">{timezoneDisplay}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Travel & Booking Section - Affiliate Integration */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Travel to {city.city}</h2>
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">Ad</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Hotels */}
                        <a
                            href={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(city.city + ',' + city.country)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-blue-200 transition-all text-left"
                        >
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                                <Building className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">Stay in {city.city}</h3>
                            <p className="text-sm text-gray-500 mb-3">Find the best hotels and accommodations.</p>
                            <span className="text-sm font-medium text-blue-600 group-hover:underline">Check Rates →</span>
                        </a>

                        {/* Flights */}
                        <a
                            href={`https://www.skyscanner.com/transport/flights-to/${city.city.toLowerCase().replace(/\s+/g, '-')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-indigo-200 transition-all text-left"
                        >
                            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-indigo-100 transition-colors">
                                <Globe className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">Flights to {city.city}</h3>
                            <p className="text-sm text-gray-500 mb-3">Compare airlines and find cheap flights.</p>
                            <span className="text-sm font-medium text-indigo-600 group-hover:underline">Search Flights →</span>
                        </a>

                        {/* Tours */}
                        <a
                            href={`https://www.viator.com/searchResults/all?text=${encodeURIComponent(city.city + ' ' + city.country)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-green-200 transition-all text-left"
                        >
                            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-100 transition-colors">
                                <MapPin className="w-5 h-5 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">Things to Do</h3>
                            <p className="text-sm text-gray-500 mb-3">Book tours, attractions, and experiences.</p>
                            <span className="text-sm font-medium text-green-600 group-hover:underline">Explore Activities →</span>
                        </a>
                    </div>
                </div>

                {/* Time Comparisons */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Compare Times</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="p-4 bg-indigo-50 rounded-xl">
                            <div className="text-xl font-mono font-semibold text-indigo-600">
                                {formatTime(currentTime, city.timezone)}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">{city.city}</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <div className="text-xl font-mono font-semibold text-gray-700">
                                {currentTime.toLocaleTimeString('en-US', {
                                    timeZone: 'UTC',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                })}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">UTC</div>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-xl">
                            <div className="text-xl font-mono font-semibold text-blue-600">
                                {currentTime.toLocaleTimeString('en-US', {
                                    timeZone: 'America/New_York',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                })}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">New York</div>
                        </div>
                        <div className="p-4 bg-green-50 rounded-xl">
                            <div className="text-xl font-mono font-semibold text-green-600">
                                {currentTime.toLocaleTimeString('en-US', {
                                    timeZone: 'Europe/London',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                })}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">London</div>
                        </div>
                    </div>
                </div>

                {/* Common Comparisons */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Time Differences</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {['new-york-usa', 'london-united-kingdom', 'tokyo-japan', 'dubai-united-arab-emirates', 'sydney-australia', 'paris-france', 'singapore-singapore', 'los-angeles-usa']
                            .filter(id => id !== city.id)
                            .slice(0, 6)
                            .map(targetId => {
                                // Simple mapping for display names - in real app would lookup
                                const names: Record<string, string> = {
                                    'new-york-usa': 'New York',
                                    'london-united-kingdom': 'London',
                                    'tokyo-japan': 'Tokyo',
                                    'dubai-united-arab-emirates': 'Dubai',
                                    'sydney-australia': 'Sydney',
                                    'paris-france': 'Paris',
                                    'singapore-singapore': 'Singapore',
                                    'los-angeles-usa': 'Los Angeles'
                                };
                                const targetName = names[targetId] || targetId;
                                return (
                                    <Link
                                        key={targetId}
                                        href={`/difference/${city.id}-vs-${targetId}`}
                                        className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all group"
                                    >
                                        <span className="font-medium text-gray-700 group-hover:text-blue-600">
                                            {city.city} vs {targetName}
                                        </span>
                                        <ArrowLeftRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                                    </Link>
                                );
                            })}
                    </div>
                </div>

                {/* Back Link */}
                <div className="text-center">
                    <Link
                        href="/world-cities"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to World Cities
                    </Link>
                </div>

                {/* SEO Content */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                        About {city.city}, {city.country}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        {city.city} is a {getPopulationLabel().toLowerCase()} located in {city.country}, {city.continent}.
                        With a population of approximately {city.population.toLocaleString()} people,
                        it operates in the {timezoneDisplay} time zone ({city.timezone}).
                    </p>
                    <p className="text-gray-600 leading-relaxed mt-3">
                        When scheduling calls or meetings with people in {city.city}, use this page to
                        check the current local time. The time shown updates every second to give you
                        the most accurate time information.
                    </p>
                </div>
            </div>
        </div>
    );
}
