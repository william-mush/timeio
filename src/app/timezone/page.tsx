import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Clock, ChevronRight, Globe } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

export const metadata: Metadata = {
    title: 'World Time Zones - Current Time by Timezone',
    description: 'Browse all world time zones. View current time in every timezone from UTC to local times. Find cities in each timezone and understand time differences.',
    keywords: [
        'world time zones',
        'timezone list',
        'all time zones',
        'UTC time zones',
        'GMT time zones',
        'time zone map',
    ],
    openGraph: {
        title: 'World Time Zones - Time.IO',
        description: 'Browse current time in every timezone worldwide',
        type: 'website',
        url: 'https://time.io/timezone',
    },
    alternates: {
        canonical: 'https://time.io/timezone',
    },
};

// Common timezone regions
const TIMEZONE_REGIONS = [
    { region: 'America', label: 'Americas', icon: '🌎' },
    { region: 'Europe', label: 'Europe', icon: '🌍' },
    { region: 'Asia', label: 'Asia', icon: '🌏' },
    { region: 'Africa', label: 'Africa', icon: '🌍' },
    { region: 'Pacific', label: 'Pacific', icon: '🌊' },
    { region: 'Australia', label: 'Australia', icon: '🦘' },
    { region: 'Atlantic', label: 'Atlantic', icon: '🌊' },
    { region: 'Indian', label: 'Indian Ocean', icon: '🌊' },
];

function timezoneToSlug(tz: string): string {
    return tz.toLowerCase().replace(/\//g, '-');
}

export default async function TimezoneIndexPage() {
    // Get unique timezones with city counts
    const timezoneData = await prisma.geoCity.groupBy({
        by: ['timezone'],
        _count: true,
        orderBy: { _count: { timezone: 'desc' } },
    });

    // Group by region
    const byRegion = TIMEZONE_REGIONS.map(r => ({
        ...r,
        timezones: timezoneData
            .filter(t => t.timezone.startsWith(r.region + '/'))
            .map(t => ({
                timezone: t.timezone,
                slug: timezoneToSlug(t.timezone),
                location: t.timezone.split('/').slice(1).join('/').replace(/_/g, ' '),
                count: t._count,
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 15),
    }));

    return (
        <div className="page-container">
            <div className="content-container max-w-6xl mx-auto">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900 dark:text-white">Timezones</span>
                </nav>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        World Time Zones
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Browse time zones by region. Each timezone page shows current time and cities in that zone.
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <div className="card p-4 text-center">
                        <div className="text-3xl font-bold text-blue-600">{timezoneData.length}</div>
                        <div className="text-sm text-gray-500">Time Zones</div>
                    </div>
                    <div className="card p-4 text-center">
                        <div className="text-3xl font-bold text-green-600">24</div>
                        <div className="text-sm text-gray-500">UTC Offsets</div>
                    </div>
                    <div className="card p-4 text-center">
                        <div className="text-3xl font-bold text-purple-600">8</div>
                        <div className="text-sm text-gray-500">Regions</div>
                    </div>
                    <div className="card p-4 text-center">
                        <div className="text-3xl font-bold text-amber-600">5.2M+</div>
                        <div className="text-sm text-gray-500">Cities</div>
                    </div>
                </div>

                {/* Timezones by Region */}
                {byRegion.map(region => (
                    <div key={region.region} className="mb-10">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <span className="text-2xl">{region.icon}</span>
                            <Clock className="w-5 h-5 text-blue-600" />
                            {region.label} Time Zones
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                            {region.timezones.map(tz => (
                                <Link
                                    key={tz.timezone}
                                    href={`/timezone/${tz.slug}`}
                                    className="card p-3 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all group"
                                >
                                    <h3 className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-blue-600 truncate">
                                        {tz.location}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {tz.count.toLocaleString()} cities
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}

                {/* SEO Content */}
                <div className="mt-12 prose dark:prose-invert max-w-none">
                    <h2>Understanding World Time Zones</h2>
                    <p>
                        The world is divided into 24 time zones, each approximately 15 degrees of longitude apart.
                        However, due to political and practical considerations, there are actually over 38 unique
                        time zones in use today, including half-hour and quarter-hour offsets.
                    </p>
                    <p>
                        Time.IO tracks time zones for over 5.2 million cities worldwide. Browse by region above
                        to find your timezone, or use our search to find any city's local time.
                    </p>
                </div>
            </div>
        </div>
    );
}
