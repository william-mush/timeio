import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

/**
 * Dynamic sitemap generation for Time.IO
 * Includes all city pages for SEO indexing
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://time.io';

    // Static pages with high priority
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/world-clock`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/time-converter`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/world-cities`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/us-cities`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/difference`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
    ];

    // Fetch top cities from database (limit to 50K to prevent memory issues)
    // Select only needed fields for efficiency
    const cities = await prisma.geoCity.findMany({
        select: {
            geonameid: true,
            asciiName: true,
            population: true,
        },
        orderBy: { population: 'desc' },
        take: 50000,  // Limit to prevent OOM during build
    });

    // Generate city URLs with priority based on population
    const cityPages: MetadataRoute.Sitemap = cities.map(city => {
        const nameSlug = city.asciiName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const slug = `${nameSlug}-${city.geonameid}`;

        // Priority based on population tiers
        let priority = 0.5;
        if (city.population >= 1000000) priority = 0.8;      // Major cities (1M+)
        else if (city.population >= 500000) priority = 0.7;  // Large cities
        else if (city.population >= 100000) priority = 0.6;  // Medium cities

        return {
            url: `${baseUrl}/city/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority,
        };
    });

    return [...staticPages, ...cityPages];
}
