import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { TimezoneClient } from './TimezoneClient';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

interface PageProps {
    params: Promise<{ zone: string }>;
}

// Convert URL slug to timezone (america-new_york -> America/New_York)
function slugToTimezone(slug: string): string {
    const parts = slug.split('-');
    if (parts.length < 2) return slug;

    // First part is continent/region, rest is location
    const region = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    const location = parts.slice(1).map(p =>
        p.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('_')
    ).join('/');

    return `${region}/${location}`;
}

// Convert timezone to URL-friendly slug
function timezoneToSlug(tz: string): string {
    return tz.toLowerCase().replace(/\//g, '-');
}

async function getTimezoneData(slug: string) {
    const timezone = slugToTimezone(slug);

    // Get cities in this timezone
    const cities = await prisma.geoCity.findMany({
        where: { timezone },
        select: {
            geonameid: true,
            name: true,
            asciiName: true,
            country: true,
            countryCode: true,
            latitude: true,
            longitude: true,
            population: true,
        },
        orderBy: { population: 'desc' },
        take: 100,
    });

    if (cities.length === 0) {
        // Try with case-insensitive search
        const citiesAlt = await prisma.geoCity.findMany({
            where: {
                timezone: {
                    equals: timezone,
                    mode: 'insensitive'
                }
            },
            select: {
                geonameid: true,
                name: true,
                asciiName: true,
                country: true,
                countryCode: true,
                timezone: true,
                latitude: true,
                longitude: true,
                population: true,
            },
            orderBy: { population: 'desc' },
            take: 100,
        });

        if (citiesAlt.length === 0) return null;

        return {
            timezone: citiesAlt[0].timezone,
            slug,
            cities: citiesAlt,
            countries: Array.from(new Set(citiesAlt.map(c => c.country))),
        };
    }

    return {
        timezone,
        slug,
        cities,
        countries: Array.from(new Set(cities.map(c => c.country))),
    };
}

// Get timezone abbreviation and offset dynamically
function getTimezoneInfo(timezone: string): { abbrev: string; offset: string; fullName: string } {
    try {
        const now = new Date();

        const shortFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            timeZoneName: 'short',
        });
        const shortParts = shortFormatter.formatToParts(now);
        const abbrev = shortParts.find(p => p.type === 'timeZoneName')?.value || '';

        const longFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            timeZoneName: 'long',
        });
        const longParts = longFormatter.formatToParts(now);
        const fullName = longParts.find(p => p.type === 'timeZoneName')?.value || timezone;

        // Calculate offset
        const offsetFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            timeZoneName: 'longOffset',
        });
        const offsetParts = offsetFormatter.formatToParts(now);
        const offset = offsetParts.find(p => p.type === 'timeZoneName')?.value || '';

        return { abbrev, offset, fullName };
    } catch {
        return { abbrev: '', offset: '', fullName: timezone };
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { zone } = await params;
    const data = await getTimezoneData(zone);

    if (!data) {
        return { title: 'Timezone Not Found' };
    }

    const info = getTimezoneInfo(data.timezone);
    const locationName = data.timezone.split('/').pop()?.replace(/_/g, ' ') || data.timezone;

    return {
        title: `${info.abbrev || locationName} Time Zone - Current Time & Cities`,
        description: `Current time in the ${info.fullName} (${info.abbrev}) timezone. View local time in ${data.cities.length}+ cities including ${data.cities[0]?.name}, ${data.cities[1]?.name}. ${info.offset}.`,
        keywords: [
            `${info.abbrev} time`,
            `${locationName} time zone`,
            `${info.fullName}`,
            `current time ${info.abbrev}`,
            `${data.timezone} timezone`,
            ...data.cities.slice(0, 5).map(c => `${c.name} time`),
        ],
        openGraph: {
            title: `${info.abbrev || locationName} Time Zone`,
            description: `Current time in ${info.fullName}`,
            type: 'website',
            url: `https://time.io/timezone/${zone}`,
        },
        alternates: {
            canonical: `https://time.io/timezone/${zone}`,
        },
    };
}

export default async function TimezonePage({ params }: PageProps) {
    const { zone } = await params;
    const data = await getTimezoneData(zone);

    if (!data) {
        notFound();
    }

    const info = getTimezoneInfo(data.timezone);

    // JSON-LD
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Place',
        name: info.fullName,
        identifier: data.timezone,
        description: `Time zone covering ${data.countries.join(', ')}`,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="page-container">
                <div className="content-container">
                    <TimezoneClient
                        timezone={data.timezone}
                        abbrev={info.abbrev}
                        fullName={info.fullName}
                        offset={info.offset}
                        cities={data.cities}
                        countries={data.countries}
                    />
                </div>
            </div>
        </>
    );
}
