'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { USCity } from '@/data/us-cities';
import { Clock, MapPin, Users, Calendar, ArrowLeft, Globe } from 'lucide-react';

interface CityTimeClientProps {
    city: USCity;
}

export function CityTimeClient({ city }: CityTimeClientProps) {
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

    const getPopulationRanking = () => {
        if (city.population >= 1000000) return 'Major Metro';
        if (city.population >= 500000) return 'Large City';
        if (city.population >= 100000) return 'Medium City';
        if (city.population >= 50000) return 'Small City';
        return 'Town';
    };

    const timezoneDisplay = city.timezone.split('/').pop()?.replace(/_/g, ' ') || city.timezone;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Breadcrumb */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <nav className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>•</span>
                        <Link href="/us-cities" className="hover:text-blue-600 transition-colors">US Cities</Link>
                        <span>•</span>
                        <span className="text-gray-900 font-medium">{city.city}, {city.state_code}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Hero Section */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                        Current Time in {city.city}
                    </h1>
                    <p className="text-xl text-gray-600">
                        {city.state} ({city.state_code})
                    </p>
                    {city.county && (
                        <p className="text-sm text-gray-500 mt-2 flex items-center justify-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {city.county}
                        </p>
                    )}
                </div>

                {/* Main Time Display */}
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 mb-8 text-center border border-gray-100">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Clock className="w-4 h-4" />
                        Live Time
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
                                <span className="font-semibold">{getPopulationRanking()}</span>
                            </div>
                            {city.county && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">County:</span>
                                    <span className="font-semibold">{city.county}</span>
                                </div>
                            )}
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
                                <span className="text-gray-600">State:</span>
                                <span className="font-semibold">{city.state}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Coordinates:</span>
                                <span className="font-semibold text-sm">
                                    {city.coordinates[1].toFixed(4)}°N, {Math.abs(city.coordinates[0]).toFixed(4)}°W
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Time Zone:</span>
                                <span className="font-semibold text-sm">{timezoneDisplay}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Time Comparisons */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Time Comparisons</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="p-4 bg-blue-50 rounded-xl">
                            <div className="text-2xl font-bold text-blue-600">
                                {formatTime(currentTime, city.timezone)}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">{city.city}</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <div className="text-2xl font-bold text-gray-700">
                                {currentTime.toLocaleTimeString('en-US', {
                                    timeZone: 'UTC',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                    hour12: true
                                })}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">UTC / GMT</div>
                        </div>
                        <div className="p-4 bg-green-50 rounded-xl">
                            <div className="text-2xl font-bold text-green-600">
                                {formatTime(new Date(Date.now() + 12 * 60 * 60 * 1000), city.timezone)}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">+12 Hours</div>
                        </div>
                    </div>
                </div>

                {/* Back Link */}
                <div className="text-center">
                    <Link
                        href="/us-cities"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to All US Cities
                    </Link>
                </div>

                {/* SEO Footer Content */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                        About {city.city}, {city.state}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        {city.city} is located in {city.state}, United States, in the {timezoneDisplay} time zone ({city.timezone}).
                        With a population of approximately {city.population.toLocaleString()} residents,
                        it is classified as a {getPopulationRanking().toLowerCase()}.
                        {city.county && ` The city is situated in ${city.county}.`}
                    </p>
                    <p className="text-gray-600 leading-relaxed mt-3">
                        When planning calls, meetings, or travel to {city.city}, remember that the local time
                        follows the {timezoneDisplay} timezone. Use this page to check the current time
                        in {city.city} and compare it with other time zones.
                    </p>
                </div>
            </div>
        </div>
    );
}
