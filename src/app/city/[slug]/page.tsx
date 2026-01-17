import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { CityTimeClient } from './CityTimeClient';

// ISR: Revalidate pages every hour for fresh data
export const revalidate = 3600;

// Allow dynamic rendering for database queries
export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Type for city data from database
interface CityData {
    geonameid: number;
    name: string;
    asciiName: string;
    country: string;
    countryCode: string;
    timezone: string;
    latitude: number;
    longitude: number;
    population: number;
    continent: string;
    admin1: string | null;
}

// Convert database city to client format
function toCityClient(city: CityData) {
    return {
        id: `${city.asciiName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${city.geonameid}`,
        geonameid: city.geonameid,
        city: city.name,
        asciiName: city.asciiName,
        country: city.country,
        countryCode: city.countryCode,
        coordinates: [city.longitude, city.latitude] as [number, number],
        population: city.population,
        timezone: city.timezone,
        continent: city.continent,
        admin1: city.admin1,
    };
}

// Helper to find city from database by geonameid
async function findCity(slug: string): Promise<ReturnType<typeof toCityClient> | null> {
    try {
        // New format: name-geonameid (e.g., "tokyo-1850147")
        // Extract geonameid from the end of the slug
        const parts = slug.split('-');
        const lastPart = parts[parts.length - 1];
        const geonameid = parseInt(lastPart, 10);

        // If the last part is a valid number, search by geonameid
        if (!isNaN(geonameid) && geonameid > 0) {
            const city = await prisma.geoCity.findUnique({
                where: { geonameid },
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
                    continent: true,
                    admin1: true,
                },
            });

            if (city) {
                return toCityClient(city);
            }
        }

        // Fallback: try to match by name and country code (old format like "tokyo-jp")
        // This supports legacy URLs
        if (parts.length >= 2) {
            const countryCode = parts[parts.length - 1].toUpperCase();
            const cityName = parts.slice(0, -1).join('-');

            const city = await prisma.geoCity.findFirst({
                where: {
                    asciiName: { equals: cityName.replace(/-/g, ' '), mode: 'insensitive' },
                    countryCode: countryCode,
                },
                orderBy: { population: 'desc' },
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
                    continent: true,
                    admin1: true,
                },
            });

            if (city) {
                return toCityClient(city);
            }
        }

        return null;
    } catch (error) {
        console.error('Error finding city:', error);
        return null;
    }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const city = await findCity(slug);

    if (!city) {
        return {
            title: 'City Not Found',
        };
    }

    const timezoneShort = city.timezone.split('/').pop()?.replace(/_/g, ' ') || city.timezone;

    return {
        title: `Current Time in ${city.city}, ${city.country} - Local Time & Time Zone`,
        description: `What time is it in ${city.city}, ${city.country}? Get the current local time, ${timezoneShort} timezone info. Population: ${city.population.toLocaleString()}.`,
        keywords: [
            `${city.city} time`,
            `time in ${city.city}`,
            `what time is it in ${city.city}`,
            `${city.city} timezone`,
            `${city.city} current time`,
            `${city.city} local time`,
            `${city.country} time`,
            `${timezoneShort} time`,
        ],
        openGraph: {
            title: `Current Time in ${city.city}, ${city.country}`,
            description: `Live local time in ${city.city}. ${city.timezone} time zone.`,
            type: 'website',
            url: `https://time.io/city/${city.id}`,
        },
        alternates: {
            canonical: `https://time.io/city/${city.id}`,
        },
    };
}

export default async function CityPage({ params }: PageProps) {
    const { slug } = await params;
    const city = await findCity(slug);

    if (!city) {
        notFound();
    }

    // JSON-LD structured data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Place',
        name: `${city.city}, ${city.country}`,
        address: {
            '@type': 'PostalAddress',
            addressLocality: city.city,
            addressCountry: city.countryCode,
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: city.coordinates[1],
            longitude: city.coordinates[0],
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="page-container">
                <div className="content-container">
                    <CityTimeClient city={city} />
                </div>
            </div>
        </>
    );
}
