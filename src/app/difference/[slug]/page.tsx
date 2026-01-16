import { Metadata } from 'next';
import { ALL_WORLD_CITIES, getAllCityById } from '@/data/all-world-cities';
import { notFound } from 'next/navigation';
import CityComparisonClient from './CityComparisonClient';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Helper to parse slug "london-uk-vs-new-york-usa" -> [city1, city2]
// We assume pattern is {city1-id}-vs-{city2-id}
// BUT city IDs contain dashes. So we need to be clever.
// Simpler approach: We'll iterate all cities to find matches at start/end.
function parseCitiesFromSlug(slug: string) {
    const parts = slug.split('-vs-');
    if (parts.length !== 2) return null;

    const id1 = parts[0];
    const id2 = parts[1];

    const city1 = getAllCityById(id1);
    const city2 = getAllCityById(id2);

    if (city1 && city2) return { city1, city2 };
    return null;
}

// Generate static params for TOP 20 cities vs TOP 20 cities (400 pages) to save build time
// Otherwise 500*500 = 250,000 pages which will timeout build.
export async function generateStaticParams() {
    // Only generate top 10 most popular interactions statically
    const topCities = ALL_WORLD_CITIES.slice(0, 10);
    const params = [];

    for (const c1 of topCities) {
        for (const c2 of topCities) {
            if (c1.id !== c2.id) {
                params.push({
                    slug: `${c1.id}-vs-${c2.id}`
                });
            }
        }
    }
    return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const data = parseCitiesFromSlug(slug);
    if (!data) return { title: 'Time Difference Calculator' };

    const { city1, city2 } = data;

    return {
        title: `Time Difference: ${city1.city} vs ${city2.city} - Meeting Planner`,
        description: `What is the time difference between ${city1.city} and ${city2.city}? Find the best time to call with our meeting planner tool.`,
        keywords: [
            `time difference ${city1.city} ${city2.city}`,
            `${city1.city} to ${city2.city} time`,
            `meeting planner ${city1.city} ${city2.city}`,
            `call time ${city1.city} ${city2.city}`
        ]
    };
}

export default async function ComparisonPage({ params }: PageProps) {
    const { slug } = await params;
    const data = parseCitiesFromSlug(slug);

    if (!data) {
        notFound();
    }

    return <CityComparisonClient city1={data.city1} city2={data.city2} />;
}
