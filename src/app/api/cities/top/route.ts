import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Cache the top cities for 24 hours - they rarely change
const CACHE_DURATION = 86400;

export async function GET() {
    try {
        const cities = await prisma.geoCity.findMany({
            select: {
                geonameid: true,
                asciiName: true,
                country: true,
                timezone: true,
                population: true,
            },
            where: {
                population: { gte: 100000 }, // Cities with 100K+ population
                timezone: { not: '' },
            },
            orderBy: { population: 'desc' },
            take: 500,
        });

        const formattedCities = cities.map(city => ({
            id: `${city.asciiName.toLowerCase().replace(/\s+/g, '-')}-${city.geonameid}`,
            city: city.asciiName,
            country: city.country || 'Unknown',
            timezone: city.timezone || 'UTC',
            geonameid: city.geonameid,
        }));

        return NextResponse.json(formattedCities, {
            headers: {
                'Cache-Control': `public, max-age=${CACHE_DURATION}, s-maxage=${CACHE_DURATION}`,
            },
        });
    } catch (error) {
        console.error('Error fetching top cities:', error);
        return NextResponse.json({ error: 'Failed to fetch cities' }, { status: 500 });
    }
}
