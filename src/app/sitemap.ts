import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // Revalidate daily

const CITIES_PER_SITEMAP = 50000;
const MIN_POPULATION = 5000;

/**
 * Sitemap Index for Time.IO
 * 
 * Returns references to:
 * - Main sitemap (static pages, countries, timezones)
 * - City sub-sitemaps (50K cities each, population 5K+)
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://time.io';

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
        { url: `${baseUrl}/world-clock`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
        { url: `${baseUrl}/time-converter`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/world-cities`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/us-cities`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/cities`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/timezone`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/difference`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ];

    // Countries
    const topCountries = ['us', 'gb', 'jp', 'de', 'fr', 'it', 'es', 'ca', 'au', 'br', 'in', 'cn', 'kr', 'mx', 'nl', 'se', 'ch', 'pl', 'be', 'at'];
    const countryPages: MetadataRoute.Sitemap = topCountries.map(code => ({
        url: `${baseUrl}/cities/${code}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Continents
    const continents = ['north-america', 'south-america', 'europe', 'asia', 'africa', 'oceania'];
    const continentPages: MetadataRoute.Sitemap = continents.map(cont => ({
        url: `${baseUrl}/cities/continent/${cont}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Timezones
    const topTimezones = [
        'america-new_york', 'america-los_angeles', 'america-chicago', 'europe-london',
        'europe-paris', 'europe-berlin', 'asia-tokyo', 'asia-shanghai', 'asia-kolkata',
        'australia-sydney', 'pacific-auckland', 'america-toronto', 'asia-dubai',
    ];
    const timezonePages: MetadataRoute.Sitemap = topTimezones.map(tz => ({
        url: `${baseUrl}/timezone/${tz}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // Get total count of cities with population 5K+
    const totalCities = await prisma.geoCity.count({
        where: { population: { gte: MIN_POPULATION } },
    });

    // Calculate number of sub-sitemaps needed
    const numSitemaps = Math.ceil(totalCities / CITIES_PER_SITEMAP);

    // Fetch top 10K cities directly (most important ones)
    const topCities = await prisma.geoCity.findMany({
        select: { geonameid: true, asciiName: true, population: true },
        where: { population: { gte: MIN_POPULATION } },
        orderBy: { population: 'desc' },
        take: 10000,
    });

    const cityPages: MetadataRoute.Sitemap = topCities.map(city => {
        const nameSlug = city.asciiName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const slug = `${nameSlug}-${city.geonameid}`;

        let priority = 0.5;
        if (city.population >= 1000000) priority = 0.8;
        else if (city.population >= 500000) priority = 0.7;
        else if (city.population >= 100000) priority = 0.6;

        return {
            url: `${baseUrl}/city/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority,
        };
    });

    // Note: For the remaining ~73K cities, Google will discover them via:
    // /api/sitemap/cities/0, /api/sitemap/cities/1
    // These are referenced in robots.txt

    return [...staticPages, ...countryPages, ...continentPages, ...timezonePages, ...cityPages];
}
