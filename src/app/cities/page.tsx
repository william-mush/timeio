import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Globe, MapPin, Clock, ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // Revalidate daily

export const metadata: Metadata = {
    title: 'World Cities by Country - Current Time in Every City',
    description: 'Browse current time in cities around the world. Select a country to view local times, time zones, and city information for thousands of cities worldwide.',
    keywords: [
        'world time by country',
        'time in countries',
        'current time worldwide',
        'city time zones',
        'international time',
    ],
    openGraph: {
        title: 'World Cities - Time.IO',
        description: 'Browse time by country and city worldwide',
        type: 'website',
        url: 'https://time.io/cities',
    },
    alternates: {
        canonical: 'https://time.io/cities',
    },
};

// Country data with proper names and flags - 80+ countries
const COUNTRIES = [
    // North America
    { code: 'US', name: 'United States', continent: 'North America' },
    { code: 'CA', name: 'Canada', continent: 'North America' },
    { code: 'MX', name: 'Mexico', continent: 'North America' },
    { code: 'GT', name: 'Guatemala', continent: 'North America' },
    { code: 'CU', name: 'Cuba', continent: 'North America' },
    { code: 'DO', name: 'Dominican Republic', continent: 'North America' },
    { code: 'HT', name: 'Haiti', continent: 'North America' },
    { code: 'JM', name: 'Jamaica', continent: 'North America' },
    { code: 'CR', name: 'Costa Rica', continent: 'North America' },
    { code: 'PA', name: 'Panama', continent: 'North America' },
    // South America
    { code: 'BR', name: 'Brazil', continent: 'South America' },
    { code: 'AR', name: 'Argentina', continent: 'South America' },
    { code: 'CL', name: 'Chile', continent: 'South America' },
    { code: 'CO', name: 'Colombia', continent: 'South America' },
    { code: 'PE', name: 'Peru', continent: 'South America' },
    { code: 'VE', name: 'Venezuela', continent: 'South America' },
    { code: 'EC', name: 'Ecuador', continent: 'South America' },
    { code: 'BO', name: 'Bolivia', continent: 'South America' },
    { code: 'PY', name: 'Paraguay', continent: 'South America' },
    { code: 'UY', name: 'Uruguay', continent: 'South America' },
    // Europe
    { code: 'GB', name: 'United Kingdom', continent: 'Europe' },
    { code: 'DE', name: 'Germany', continent: 'Europe' },
    { code: 'FR', name: 'France', continent: 'Europe' },
    { code: 'IT', name: 'Italy', continent: 'Europe' },
    { code: 'ES', name: 'Spain', continent: 'Europe' },
    { code: 'RU', name: 'Russia', continent: 'Europe' },
    { code: 'NL', name: 'Netherlands', continent: 'Europe' },
    { code: 'SE', name: 'Sweden', continent: 'Europe' },
    { code: 'CH', name: 'Switzerland', continent: 'Europe' },
    { code: 'PL', name: 'Poland', continent: 'Europe' },
    { code: 'BE', name: 'Belgium', continent: 'Europe' },
    { code: 'AT', name: 'Austria', continent: 'Europe' },
    { code: 'NO', name: 'Norway', continent: 'Europe' },
    { code: 'DK', name: 'Denmark', continent: 'Europe' },
    { code: 'FI', name: 'Finland', continent: 'Europe' },
    { code: 'IE', name: 'Ireland', continent: 'Europe' },
    { code: 'PT', name: 'Portugal', continent: 'Europe' },
    { code: 'GR', name: 'Greece', continent: 'Europe' },
    { code: 'CZ', name: 'Czech Republic', continent: 'Europe' },
    { code: 'RO', name: 'Romania', continent: 'Europe' },
    { code: 'HU', name: 'Hungary', continent: 'Europe' },
    { code: 'UA', name: 'Ukraine', continent: 'Europe' },
    { code: 'SK', name: 'Slovakia', continent: 'Europe' },
    { code: 'BG', name: 'Bulgaria', continent: 'Europe' },
    { code: 'HR', name: 'Croatia', continent: 'Europe' },
    { code: 'RS', name: 'Serbia', continent: 'Europe' },
    // Asia
    { code: 'JP', name: 'Japan', continent: 'Asia' },
    { code: 'CN', name: 'China', continent: 'Asia' },
    { code: 'IN', name: 'India', continent: 'Asia' },
    { code: 'KR', name: 'South Korea', continent: 'Asia' },
    { code: 'SG', name: 'Singapore', continent: 'Asia' },
    { code: 'HK', name: 'Hong Kong', continent: 'Asia' },
    { code: 'TW', name: 'Taiwan', continent: 'Asia' },
    { code: 'TH', name: 'Thailand', continent: 'Asia' },
    { code: 'MY', name: 'Malaysia', continent: 'Asia' },
    { code: 'ID', name: 'Indonesia', continent: 'Asia' },
    { code: 'PH', name: 'Philippines', continent: 'Asia' },
    { code: 'VN', name: 'Vietnam', continent: 'Asia' },
    { code: 'AE', name: 'UAE', continent: 'Asia' },
    { code: 'SA', name: 'Saudi Arabia', continent: 'Asia' },
    { code: 'IL', name: 'Israel', continent: 'Asia' },
    { code: 'TR', name: 'Turkey', continent: 'Asia' },
    { code: 'PK', name: 'Pakistan', continent: 'Asia' },
    { code: 'BD', name: 'Bangladesh', continent: 'Asia' },
    { code: 'IR', name: 'Iran', continent: 'Asia' },
    { code: 'IQ', name: 'Iraq', continent: 'Asia' },
    { code: 'QA', name: 'Qatar', continent: 'Asia' },
    { code: 'KW', name: 'Kuwait', continent: 'Asia' },
    { code: 'LK', name: 'Sri Lanka', continent: 'Asia' },
    { code: 'NP', name: 'Nepal', continent: 'Asia' },
    // Africa
    { code: 'ZA', name: 'South Africa', continent: 'Africa' },
    { code: 'EG', name: 'Egypt', continent: 'Africa' },
    { code: 'NG', name: 'Nigeria', continent: 'Africa' },
    { code: 'KE', name: 'Kenya', continent: 'Africa' },
    { code: 'MA', name: 'Morocco', continent: 'Africa' },
    { code: 'GH', name: 'Ghana', continent: 'Africa' },
    { code: 'TZ', name: 'Tanzania', continent: 'Africa' },
    { code: 'ET', name: 'Ethiopia', continent: 'Africa' },
    { code: 'UG', name: 'Uganda', continent: 'Africa' },
    { code: 'DZ', name: 'Algeria', continent: 'Africa' },
    { code: 'TN', name: 'Tunisia', continent: 'Africa' },
    { code: 'SN', name: 'Senegal', continent: 'Africa' },
    // Oceania
    { code: 'AU', name: 'Australia', continent: 'Oceania' },
    { code: 'NZ', name: 'New Zealand', continent: 'Oceania' },
    { code: 'FJ', name: 'Fiji', continent: 'Oceania' },
    { code: 'PG', name: 'Papua New Guinea', continent: 'Oceania' },
];

const CONTINENTS = [
    { name: 'North America', icon: '🌎', count: 10 },
    { name: 'South America', icon: '🌎', count: 10 },
    { name: 'Europe', icon: '🌍', count: 26 },
    { name: 'Asia', icon: '🌏', count: 24 },
    { name: 'Africa', icon: '🌍', count: 12 },
    { name: 'Oceania', icon: '🌏', count: 4 },
];

function getCountryFlag(code: string): string {
    const codePoints = code
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

export default async function CitiesIndexPage() {
    // Get city counts by country
    const countryCounts = await prisma.geoCity.groupBy({
        by: ['countryCode'],
        _count: true,
        orderBy: { _count: { countryCode: 'desc' } },
    });

    const countryCountMap = Object.fromEntries(
        countryCounts.map(c => [c.countryCode, c._count])
    );

    // Group countries by continent
    const byContinent = CONTINENTS.map(cont => ({
        ...cont,
        countries: COUNTRIES.filter(c => c.continent === cont.name),
    }));

    return (
        <div className="page-container">
            <div className="content-container max-w-6xl mx-auto">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900 dark:text-white">Cities</span>
                </nav>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        World Cities by Country
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Browse current time in cities around the world. Select a country to explore its cities and time zones.
                    </p>
                </div>

                {/* Continents Grid */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <Globe className="w-6 h-6 text-blue-600" />
                        Browse by Continent
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {CONTINENTS.map(cont => (
                            <Link
                                key={cont.name}
                                href={`/cities/continent/${cont.name.toLowerCase().replace(/ /g, '-')}`}
                                className="card p-4 text-center hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all group"
                            >
                                <div className="text-4xl mb-2">{cont.icon}</div>
                                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600">
                                    {cont.name}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Countries by Continent */}
                {byContinent.map(cont => (
                    <div key={cont.name} className="mb-10">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-blue-600" />
                            {cont.name}
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {cont.countries.map(country => (
                                <Link
                                    key={country.code}
                                    href={`/cities/${country.code.toLowerCase()}`}
                                    className="card p-3 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all group"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">{getCountryFlag(country.code)}</span>
                                        <div>
                                            <h3 className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-blue-600">
                                                {country.name}
                                            </h3>
                                            <p className="text-xs text-gray-500">
                                                {(countryCountMap[country.code] || 0).toLocaleString()} cities
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}

                {/* SEO Content */}
                <div className="mt-12 prose dark:prose-invert max-w-none">
                    <h2>Explore World Time by Country</h2>
                    <p>
                        Time.IO provides current local time for over 5 million cities worldwide.
                        Browse our comprehensive database organized by country and continent to find
                        the exact time in any location on Earth.
                    </p>
                    <p>
                        Each country page shows the current time in major cities, available time zones,
                        and detailed information about each city including population and coordinates.
                    </p>
                </div>
            </div>
        </div>
    );
}
