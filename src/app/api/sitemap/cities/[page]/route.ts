import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // Revalidate daily

const CITIES_PER_SITEMAP = 50000;
const MIN_POPULATION = 5000; // Only cities with 5K+ population

interface RouteParams {
    params: Promise<{ page: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
    const { page } = await params;
    const pageNum = parseInt(page, 10);

    if (isNaN(pageNum) || pageNum < 0) {
        return NextResponse.json({ error: 'Invalid page number' }, { status: 400 });
    }

    const baseUrl = 'https://time.io';
    const offset = pageNum * CITIES_PER_SITEMAP;

    // Fetch cities for this page with cursor-based pagination
    const cities = await prisma.geoCity.findMany({
        select: {
            geonameid: true,
            asciiName: true,
            population: true,
        },
        where: {
            population: { gte: MIN_POPULATION },
        },
        orderBy: { population: 'desc' },
        skip: offset,
        take: CITIES_PER_SITEMAP,
    });

    if (cities.length === 0) {
        return NextResponse.json({ error: 'No cities found for this page' }, { status: 404 });
    }

    // Generate XML sitemap
    const urls = cities.map(city => {
        const nameSlug = city.asciiName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const slug = `${nameSlug}-${city.geonameid}`;

        // Priority based on population
        let priority = '0.5';
        if (city.population >= 1000000) priority = '0.8';
        else if (city.population >= 500000) priority = '0.7';
        else if (city.population >= 100000) priority = '0.6';

        return `  <url>
    <loc>${baseUrl}/city/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    }).join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
    });
}
