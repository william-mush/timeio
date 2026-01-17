'use client';

import { useState, useEffect } from 'react';
import { CityWeather } from '@/components/CityWeather';

// Flexible city interface that works with both static and database data
interface City {
    id?: string;
    geonameid?: number;
    city: string;
    asciiName?: string;
    country: string;
    countryCode: string;
    coordinates: [number, number];
    population: number;
    timezone: string;
    continent: string;
    admin1?: string | null;
}

interface Props {
    city: City;
}

// US State name mapping
const US_STATES: Record<string, string> = {
    'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas',
    'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware',
    'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii', 'ID': 'Idaho',
    'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas',
    'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
    'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi',
    'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada',
    'NH': 'New Hampshire', 'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York',
    'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio', 'OK': 'Oklahoma',
    'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
    'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah',
    'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia',
    'WI': 'Wisconsin', 'WY': 'Wyoming', 'DC': 'Washington D.C.',
};

// Timezone to full name mapping
const TIMEZONE_NAMES: Record<string, string> = {
    'America/New_York': 'Eastern Standard Time (EST)',
    'America/Chicago': 'Central Standard Time (CST)',
    'America/Denver': 'Mountain Standard Time (MST)',
    'America/Los_Angeles': 'Pacific Standard Time (PST)',
    'America/Anchorage': 'Alaska Standard Time (AKST)',
    'Pacific/Honolulu': 'Hawaii-Aleutian Standard Time (HST)',
    'America/Phoenix': 'Mountain Standard Time (MST)',
    'Europe/London': 'Greenwich Mean Time (GMT)',
    'Europe/Paris': 'Central European Time (CET)',
    'Europe/Berlin': 'Central European Time (CET)',
    'Europe/Moscow': 'Moscow Standard Time (MSK)',
    'Asia/Tokyo': 'Japan Standard Time (JST)',
    'Asia/Shanghai': 'China Standard Time (CST)',
    'Asia/Kolkata': 'India Standard Time (IST)',
    'Asia/Dubai': 'Gulf Standard Time (GST)',
    'Australia/Sydney': 'Australian Eastern Standard Time (AEST)',
    'Australia/Melbourne': 'Australian Eastern Standard Time (AEST)',
    'Pacific/Auckland': 'New Zealand Standard Time (NZST)',
};

function getStateName(admin1: string | null | undefined): string {
    if (!admin1) return '';
    return US_STATES[admin1] || admin1;
}

function getFullTimezoneName(timezone: string): string {
    const shortName = timezone.split('/').pop()?.replace(/_/g, ' ') || timezone;
    const fullName = TIMEZONE_NAMES[timezone];
    if (fullName) {
        return `${shortName} / ${fullName}`;
    }
    return shortName;
}

export function CityTimeClient({ city }: Props) {
    const [timeStr, setTimeStr] = useState('--:--:--');
    const [dateStr, setDateStr] = useState('---');
    const [mounted, setMounted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);

        // Guard against missing city data
        if (!city || !city.timezone) {
            setError('City data is missing');
            return;
        }

        const updateTime = () => {
            const now = new Date();
            try {
                setTimeStr(now.toLocaleTimeString('en-US', {
                    timeZone: city.timezone,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true,
                }));
                setDateStr(now.toLocaleDateString('en-US', {
                    timeZone: city.timezone,
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }));
            } catch (e) {
                console.error('Timezone error:', e);
                setTimeStr('Invalid timezone');
                setDateStr('---');
            }
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [city?.timezone]);

    if (error) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="card p-8 text-center">
                    <p className="text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    if (!mounted) {
        return (
            <div className="max-w-4xl mx-auto animate-pulse">
                <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                <div className="h-12 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-8" />
                <div className="card p-8 mb-6">
                    <div className="h-16 w-72 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <span>{city.continent || 'Unknown'}</span>
                    <span>•</span>
                    {city.countryCode === 'US' && city.admin1 && (
                        <>
                            <span>{getStateName(city.admin1)}</span>
                            <span>•</span>
                        </>
                    )}
                    <span>{city.country || 'Unknown'}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                    {city.city || 'Unknown City'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Population: {(city.population || 0).toLocaleString()}
                </p>
            </div>

            {/* Time Card */}
            <div className="card p-8 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                            Current Local Time
                        </div>
                        <div className="text-5xl md:text-6xl font-mono font-light text-gray-900 dark:text-white tracking-tight tabular-nums">
                            {timeStr}
                        </div>
                        <div className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                            {dateStr}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                {city.timezone}
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                                {city.countryCode}
                            </span>
                        </div>
                    </div>

                    {/* Weather */}
                    <div className="lg:text-right">
                        {city.coordinates && city.coordinates.length >= 2 && (
                            <CityWeather lat={city.coordinates[1]} lng={city.coordinates[0]} />
                        )}
                    </div>
                </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Timezone</div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                        {getFullTimezoneName(city.timezone || '')}
                    </div>
                </div>
                <div className="card p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Coordinates</div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                        {city.coordinates && city.coordinates.length >= 2
                            ? `${city.coordinates[1]?.toFixed(4) || 0}°, ${city.coordinates[0]?.toFixed(4) || 0}°`
                            : 'Unknown'}
                    </div>
                </div>
                <div className="card p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Region</div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                        {city.continent || 'Unknown'}
                    </div>
                </div>
            </div>
        </div>
    );
}
