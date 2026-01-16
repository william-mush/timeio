import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Search cities API endpoint
 * GET /api/search-cities?q=tokyo&limit=50&country=JP
 * 
 * Fast search across 11M+ places using PostgreSQL indexes
 */
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q')?.trim() || '';
    const limit = Math.min(parseInt(searchParams.get('limit') || '30'), 100);
    const country = searchParams.get('country')?.toUpperCase();
    const continent = searchParams.get('continent');

    try {
        // If no query, return top cities by population
        if (!query) {
            const cities = await prisma.geoCity.findMany({
                where: {
                    ...(country && { countryCode: country }),
                    ...(continent && { continent }),
                    population: { gt: 100000 }, // Only show cities with 100k+ pop for empty search
                },
                orderBy: { population: 'desc' },
                take: limit,
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
                },
            });

            return NextResponse.json({
                results: cities,
                total: cities.length,
                query: '',
            });
        }

        // Search with query - use case-insensitive prefix match
        // The index on asciiName makes this fast
        const cities = await prisma.geoCity.findMany({
            where: {
                OR: [
                    { asciiName: { startsWith: query, mode: 'insensitive' } },
                    { name: { startsWith: query, mode: 'insensitive' } },
                    // Also search by contains for better results (slightly slower)
                    { asciiName: { contains: query, mode: 'insensitive' } },
                ],
                ...(country && { countryCode: country }),
                ...(continent && { continent }),
            },
            orderBy: { population: 'desc' },
            take: limit,
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
            },
        });

        return NextResponse.json({
            results: cities,
            total: cities.length,
            query,
        });
    } catch (error) {
        console.error('City search error:', error);
        return NextResponse.json(
            { error: 'Search failed', message: String(error) },
            { status: 500 }
        );
    }
}
