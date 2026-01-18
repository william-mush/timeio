'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SmartSearch } from '@/components/SmartSearch';
import { MapPin, Clock, Globe, ChevronRight } from 'lucide-react';

interface City {
    geonameid: number;
    name: string;
    asciiName: string;
    timezone: string;
    latitude: number;
    longitude: number;
    population: number;
    admin1: string | null;
}

interface Props {
    countryCode: string;
    countryName: string;
    continent: string;
    cities: City[];
    timezones: string[];
    totalCities: number;
}

function CityTime({ timezone }: { timezone: string }) {
    const [time, setTime] = useState('--:--');

    useEffect(() => {
        const updateTime = () => {
            try {
                setTime(new Date().toLocaleTimeString('en-US', {
                    timeZone: timezone,
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                }));
            } catch {
                setTime('--:--');
            }
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [timezone]);

    return <span className="font-mono tabular-nums">{time}</span>;
}

// Country flag emoji from country code
function getCountryFlag(code: string): string {
    const codePoints = code
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

export function CountryClient({ countryCode, countryName, continent, cities, timezones, totalCities }: Props) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const flag = getCountryFlag(countryCode);

    return (
        <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <Link href="/" className="hover:text-blue-600">Home</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/cities" className="hover:text-blue-600">Cities</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 dark:text-white">{countryName}</span>
            </nav>

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-6xl">{flag}</span>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                            Time in {countryName}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {continent} • {timezones.length} time zone{timezones.length > 1 ? 's' : ''} • {totalCities.toLocaleString()} cities
                        </p>
                    </div>
                </div>
            </div>

            {/* Time Zones Summary */}
            <div className="card p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Current Time by Zone
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {timezones.slice(0, 6).map(tz => (
                        <div key={tz} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div>
                                <div className="font-medium text-gray-900 dark:text-white text-sm">
                                    {tz.split('/').pop()?.replace(/_/g, ' ')}
                                </div>
                                <div className="text-xs text-gray-500">{tz}</div>
                            </div>
                            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                {mounted ? <CityTime timezone={tz} /> : '--:--'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cities Grid */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Major Cities in {countryName}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cities.map(city => {
                        const slug = `${city.asciiName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${city.geonameid}`;
                        return (
                            <Link
                                key={city.geonameid}
                                href={`/city/${slug}`}
                                className="card p-4 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all group"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                            {city.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {city.admin1 || city.timezone.split('/').pop()?.replace(/_/g, ' ')}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Pop: {city.population.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                            {mounted ? <CityTime timezone={city.timezone} /> : '--:--'}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Search */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center flex items-center justify-center gap-2">
                    <Globe className="w-5 h-5" />
                    Search Cities in {countryName}
                </h2>
                <SmartSearch />
            </div>

            {/* SEO Content */}
            <div className="mt-12 prose dark:prose-invert max-w-none">
                <h2>About Time in {countryName}</h2>
                <p>
                    {countryName} spans {timezones.length} time zone{timezones.length > 1 ? 's' : ''},
                    with {totalCities.toLocaleString()} cities in our database. The most populous city is {cities[0]?.name}
                    with a population of {cities[0]?.population.toLocaleString()}.
                </p>
                <p>
                    Use our world clock to track current time in any city in {countryName}.
                    Click on any city above to see detailed timezone information, weather, and nearby cities.
                </p>
            </div>
        </div>
    );
}
