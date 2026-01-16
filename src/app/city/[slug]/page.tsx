import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TOP_CITIES, type GeoCity } from '@/data/geonames-top-cities';
import { CityTimeClient } from './CityTimeClient';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Helper to find city from either top cities or full dataset
async function findCity(slug: string): Promise<GeoCity | undefined> {
    // First check top cities (fast, already loaded)
    let city = TOP_CITIES.find(c => c.id === slug);
    if (city) return city;

    // If not found, load full dataset
    const { ALL_GEONAMES_CITIES } = await import('@/data/geonames-all-cities');
    return ALL_GEONAMES_CITIES.find(c => c.id === slug);
}

// Generate static params for top 500 cities (pre-rendered)
export async function generateStaticParams() {
    return TOP_CITIES.map((city) => ({
        slug: city.id,
    }));
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
