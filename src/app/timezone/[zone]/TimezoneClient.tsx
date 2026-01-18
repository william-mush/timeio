'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SmartSearch } from '@/components/SmartSearch';
import { Clock, MapPin, Globe, ChevronRight, Sun, Moon } from 'lucide-react';

interface City {
    geonameid: number;
    name: string;
    asciiName: string;
    country: string;
    countryCode: string;
    latitude: number;
    longitude: number;
    population: number;
}

interface Props {
    timezone: string;
    abbrev: string;
    fullName: string;
    offset: string;
    cities: City[];
    countries: string[];
}

function getCountryFlag(code: string): string {
    try {
        const codePoints = code
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    } catch {
        return '';
    }
}

export function TimezoneClient({ timezone, abbrev, fullName, offset, cities, countries }: Props) {
    const [time, setTime] = useState('--:--:--');
    const [date, setDate] = useState('---');
    const [isDaytime, setIsDaytime] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const updateTime = () => {
            try {
                const now = new Date();
                setTime(now.toLocaleTimeString('en-US', {
                    timeZone: timezone,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true,
                }));
                setDate(now.toLocaleDateString('en-US', {
                    timeZone: timezone,
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }));

                // Check if daytime (6am - 6pm)
                const hour = parseInt(now.toLocaleTimeString('en-US', {
                    timeZone: timezone,
                    hour: 'numeric',
                    hour12: false,
                }));
                setIsDaytime(hour >= 6 && hour < 18);
            } catch {
                setTime('--:--:--');
                setDate('---');
            }
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [timezone]);

    const locationName = timezone.split('/').pop()?.replace(/_/g, ' ') || timezone;

    return (
        <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <Link href="/" className="hover:text-blue-600">Home</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/timezone" className="hover:text-blue-600">Timezones</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 dark:text-white">{abbrev || locationName}</span>
            </nav>

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    {mounted && (isDaytime ?
                        <Sun className="w-8 h-8 text-amber-500" /> :
                        <Moon className="w-8 h-8 text-indigo-400" />
                    )}
                    <span className="text-3xl font-bold text-blue-600">{abbrev}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                    {fullName}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                    {offset} • {countries.length} countr{countries.length === 1 ? 'y' : 'ies'} • {cities.length}+ cities
                </p>
            </div>

            {/* Current Time Card */}
            <div className="card p-8 mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
                <div className="text-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                        Current Time
                    </div>
                    <div className="text-6xl md:text-7xl font-mono font-light text-gray-900 dark:text-white tracking-tight tabular-nums">
                        {mounted ? time : '--:--:--'}
                    </div>
                    <div className="text-xl text-gray-600 dark:text-gray-400 mt-4">
                        {mounted ? date : '---'}
                    </div>
                    <div className="mt-4 flex justify-center gap-3">
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            {timezone}
                        </span>
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                            {offset}
                        </span>
                    </div>
                </div>
            </div>

            {/* Countries in this timezone */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    Countries in {abbrev || locationName} Time Zone
                </h2>
                <div className="flex flex-wrap gap-2">
                    {countries.map(country => {
                        const city = cities.find(c => c.country === country);
                        const flag = city ? getCountryFlag(city.countryCode) : '';
                        return (
                            <Link
                                key={country}
                                href={`/cities/${city?.countryCode.toLowerCase() || ''}`}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                                <span>{flag}</span>
                                <span className="font-medium">{country}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Cities Grid */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Major Cities in {abbrev || locationName}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {cities.slice(0, 24).map(city => {
                        const slug = `${city.asciiName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${city.geonameid}`;
                        return (
                            <Link
                                key={city.geonameid}
                                href={`/city/${slug}`}
                                className="card p-3 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{getCountryFlag(city.countryCode)}</span>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-blue-600">
                                            {city.name}
                                        </h3>
                                        <p className="text-xs text-gray-500">{city.country}</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Search */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                    Search Cities Worldwide
                </h2>
                <SmartSearch />
            </div>

            {/* SEO Content */}
            <div className="mt-12 prose dark:prose-invert max-w-none">
                <h2>About {fullName}</h2>
                <p>
                    The {fullName} ({abbrev}) is {offset} from Coordinated Universal Time (UTC).
                    This timezone is used by {countries.length} countr{countries.length === 1 ? 'y' : 'ies'}: {countries.join(', ')}.
                </p>
                <p>
                    Major cities in this timezone include {cities.slice(0, 5).map(c => c.name).join(', ')}.
                    Use the city links above to see detailed local time, weather, and nearby cities for each location.
                </p>
            </div>
        </div>
    );
}
