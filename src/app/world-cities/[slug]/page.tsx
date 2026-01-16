import { Metadata } from 'next';
import { ALL_WORLD_CITIES, getAllCityById } from '@/data/all-world-cities';
import { notFound } from 'next/navigation';
import { WorldCityTimeClient } from './WorldCityTimeClient';
import { CityWeather } from '@/components/CityWeather';


interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate static params for all world cities
export async function generateStaticParams() {
    return ALL_WORLD_CITIES.map((city) => ({
        slug: city.id,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const city = getAllCityById(slug);

    if (!city) {
        return {
            title: 'City Not Found',
        };
    }

    const timezoneShort = city.timezone.split('/').pop()?.replace(/_/g, ' ') || city.timezone;

    return {
        title: `Current Time in ${city.city}, ${city.country} - Local Time & Time Zone`,
        description: `What time is it in ${city.city}, ${city.country}? Get the current local time, ${timezoneShort} timezone info, and time difference. Population: ${city.population.toLocaleString()}.`,
        keywords: [
            `${city.city} time`,
            `time in ${city.city}`,
            `what time is it in ${city.city}`,
            `${city.city} timezone`,
            `${city.city} current time`,
            `${city.city} local time`,
            `${city.country} time`,
            `${timezoneShort} time`,
            `${city.city} ${city.country} time zone`,
        ],
        openGraph: {
            title: `Current Time in ${city.city}, ${city.country}`,
            description: `Live local time in ${city.city}. ${city.timezone} time zone.`,
            type: 'website',
            url: `https://time.io/world-cities/${city.id}`,
        },
        twitter: {
            card: 'summary',
            title: `Time in ${city.city}, ${city.country}`,
            description: `Current local time in ${city.city}`,
        },
        alternates: {
            canonical: `https://time.io/world-cities/${city.id}`,
        },
    };
}

export default async function WorldCityPage({ params }: PageProps) {
    const { slug } = await params;
    const city = getAllCityById(slug);

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
            <div className="relative">
                <div className="absolute top-4 right-4 z-10 hidden md:block">
                    <CityWeather lat={city.coordinates[1]} lng={city.coordinates[0]} />
                </div>
                <WorldCityTimeClient city={city}>
                    {/* Cloud component for mobile layout if needed inside client */}
                    <div className="md:hidden mb-6">
                        <CityWeather lat={city.coordinates[1]} lng={city.coordinates[0]} />
                    </div>
                </WorldCityTimeClient>
            </div>

        </>
    );
}
