import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Cache the top cities for 24 hours - they rarely change
const CACHE_DURATION = 86400;

export async function GET() {
    try {
        // Fetch top 1000 cities worldwide by population
        const worldwideCities = await prisma.geoCity.findMany({
            select: {
                geonameid: true,
                asciiName: true,
                country: true,
                timezone: true,
                population: true,
            },
            where: {
                population: { gte: 50000 },
                timezone: { not: '' },
            },
            orderBy: { population: 'desc' },
            take: 1000,
        });

        // Fetch all US cities with 50k+ population
        const usCities = await prisma.geoCity.findMany({
            select: {
                geonameid: true,
                asciiName: true,
                country: true,
                timezone: true,
                population: true,
            },
            where: {
                country: 'United States',
                population: { gte: 50000 },
                timezone: { not: '' },
            },
            orderBy: { population: 'desc' },
        });

        // Combine and deduplicate by geonameid
        const seenIds = new Set<number>();
        const combinedCities = [];

        // Add worldwide first (already sorted by population)
        for (const city of worldwideCities) {
            if (!seenIds.has(city.geonameid)) {
                seenIds.add(city.geonameid);
                combinedCities.push(city);
            }
        }

        // Add remaining US cities not already in the list
        for (const city of usCities) {
            if (!seenIds.has(city.geonameid)) {
                seenIds.add(city.geonameid);
                combinedCities.push(city);
            }
        }

        // Sort final list by population
        combinedCities.sort((a, b) => b.population - a.population);

        const formattedCities = combinedCities.map(city => ({
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
