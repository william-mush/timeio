import { Metadata } from 'next';
import { US_CITIES } from '@/data/us-cities';
import { notFound } from 'next/navigation';
import { TimezonePageClient } from './TimezonePageClient';

interface PageProps {
    params: {
        zone: string;
    };
}

// Map of zone slugs to full timezone and labels
const timezoneMap: Record<string, { timezone: string; label: string }> = {
    'new-york': { timezone: 'America/New_York', label: 'Eastern' },
    'chicago': { timezone: 'America/Chicago', label: 'Central' },
    'denver': { timezone: 'America/Denver', label: 'Mountain' },
    'phoenix': { timezone: 'America/Phoenix', label: 'Mountain (No DST)' },
    'los-angeles': { timezone: 'America/Los_Angeles', label: 'Pacific' },
    'anchorage': { timezone: 'America/Anchorage', label: 'Alaska' },
    'honolulu': { timezone: 'Pacific/Honolulu', label: 'Hawaii' },
    'boise': { timezone: 'America/Boise', label: 'Mountain (Boise)' },
    'detroit': { timezone: 'America/Detroit', label: 'Eastern (Detroit)' },
    'indiana-indianapolis': { timezone: 'America/Indiana/Indianapolis', label: 'Eastern (Indiana)' },
    'kentucky-louisville': { timezone: 'America/Kentucky/Louisville', label: 'Eastern (Louisville)' },
};

// Generate static params
export async function generateStaticParams() {
    const zones = Array.from(new Set(US_CITIES.map(c => c.timezone)));
    return zones.map(tz => ({
        zone: tz.replace('America/', '').replace('Pacific/', '').toLowerCase().replace(/_/g, '-').replace(/\//g, '-'),
    }));
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const tzInfo = timezoneMap[params.zone];

    if (!tzInfo) {
        // Try to find by partial match
        const matchingTz = Object.entries(timezoneMap).find(([key]) =>
            params.zone.includes(key) || key.includes(params.zone)
        );
        if (!matchingTz) {
            return { title: 'Time Zone Not Found' };
        }
    }

    const label = tzInfo?.label || params.zone.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    return {
        title: `${label} Time Zone - Current Time in US Cities`,
        description: `Current ${label} Time and all US cities in this time zone. Live clock and city directory.`,
        keywords: [
            `${label} time`,
            `${label} time zone`,
            `current ${label} time`,
            `cities in ${label} time zone`,
            `US ${label} time`,
        ],
        openGraph: {
            title: `${label} Time Zone - Time.IO`,
            description: `Current time and cities in the ${label} time zone`,
            type: 'website',
            url: `https://time.io/us-cities/timezone/${params.zone}`,
        },
        alternates: {
            canonical: `https://time.io/us-cities/timezone/${params.zone}`,
        },
    };
}

export default function TimezonePage({ params }: PageProps) {
    // Find matching timezone
    let timezone: string | null = null;
    let label: string = '';

    // Check direct match first
    if (timezoneMap[params.zone]) {
        timezone = timezoneMap[params.zone].timezone;
        label = timezoneMap[params.zone].label;
    } else {
        // Try to find by converting the slug back to timezone format
        const possibleTz1 = `America/${params.zone.replace(/-/g, '_').replace(/\b\w/g, c => c.toUpperCase())}`;
        const possibleTz2 = `Pacific/${params.zone.replace(/-/g, '_').replace(/\b\w/g, c => c.toUpperCase())}`;

        const matchingCities = US_CITIES.filter(c =>
            c.timezone === possibleTz1 || c.timezone === possibleTz2 ||
            c.timezone.toLowerCase().includes(params.zone.replace(/-/g, '/'))
        );

        if (matchingCities.length > 0) {
            timezone = matchingCities[0].timezone;
            label = timezone.replace('America/', '').replace('Pacific/', '').replace(/_/g, ' ');
        }
    }

    if (!timezone) {
        notFound();
    }

    const cities = US_CITIES.filter(c =>
        c.timezone === timezone && c.population >= 24000
    );

    if (cities.length === 0) {
        notFound();
    }

    return <TimezonePageClient timezone={timezone} tzLabel={label} cities={cities} />;
}
