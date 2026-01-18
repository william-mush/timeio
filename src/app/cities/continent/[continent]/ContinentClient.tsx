'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SmartSearch } from '@/components/SmartSearch';
import { MapPin, Clock, Globe, ChevronRight } from 'lucide-react';

interface City {
    geonameid: number;
    name: string;
    asciiName: string;
    country: string;
    countryCode: string;
    timezone: string;
    latitude: number;
    longitude: number;
    population: number;
}

interface Country {
    code: string;
    name: string;
    cityCount: number;
}

interface Props {
    name: string;
    icon: string;
    description: string;
    countries: Country[];
    cities: City[];
    timezones: string[];
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

export function ContinentClient({ name, icon, description, countries, cities, timezones }: Props) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <Link href="/" className="hover:text-blue-600">Home</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/cities" className="hover:text-blue-600">Cities</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 dark:text-white">{name}</span>
            </nav>

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-6xl">{icon}</span>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                            Time in {name}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {description}
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        {countries.length} countries
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {timezones.length} time zones
                    </span>
                    <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {cities.length}+ major cities
                    </span>
                </div>
            </div>

            {/* Countries */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    Countries in {name}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {countries.map(country => (
                        <Link
                            key={country.code}
                            href={`/cities/${country.code.toLowerCase()}`}
                            className="card p-3 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all group"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">{getCountryFlag(country.code)}</span>
                                <div>
                                    <h3 className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-blue-600 truncate">
                                        {country.name}
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        {country.cityCount.toLocaleString()} cities
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Major Cities */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Major Cities in {name}
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
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{getCountryFlag(city.countryCode)}</span>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-blue-600">
                                                {city.name}
                                            </h3>
                                            <p className="text-xs text-gray-500">{city.country}</p>
                                        </div>
                                    </div>
                                    <div className="text-blue-600 dark:text-blue-400 font-bold">
                                        {mounted ? <CityTime timezone={city.timezone} /> : '--:--'}
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
                    Search Cities in {name}
                </h2>
                <SmartSearch />
            </div>
        </div>
    );
}
