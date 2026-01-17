import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Search cities API endpoint
 * GET /api/search-cities?q=tokyo&limit=50&country=JP
 * 
 * OPTIMIZED with tiered search:
 * 1. First try fast prefix match (uses btree index)
 * 2. Only fall back to similarity if insufficient results
 */

interface CityResult {
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
                    population: { gt: 100000 },
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
                    admin1: true,
                },
            });

            return NextResponse.json({
                results: cities,
                total: cities.length,
                query: '',
            });
        }

        // Build WHERE clause for optional filters
        const conditions: string[] = [];
        const params: (string | number)[] = [query.toLowerCase()];
        let paramIndex = 2;

        if (country) {
            conditions.push(`"countryCode" = $${paramIndex}`);
            params.push(country);
            paramIndex++;
        }

        if (continent) {
            conditions.push(`continent = $${paramIndex}`);
            params.push(continent);
            paramIndex++;
        }

        const whereClause = conditions.length > 0
            ? `AND ${conditions.join(' AND ')}`
            : '';

        // TIER 1: Fast prefix search using ILIKE (uses GIN trigram index!)
        const prefixResults = await prisma.$queryRawUnsafe<CityResult[]>(`
            SELECT 
                geonameid, name, "asciiName", country, "countryCode",
                timezone, latitude, longitude, population, continent, admin1
            FROM geo_cities
            WHERE (
                "asciiName" ILIKE $1 || '%'
                OR name ILIKE $1 || '%'
            )
            ${whereClause}
            ORDER BY 
                CASE WHEN LOWER("asciiName") = LOWER($1) THEN 0 ELSE 1 END,
                population DESC
            LIMIT ${limit}
        `, query, ...params.slice(1));

        // If we have ANY prefix results, return them immediately (fast path)
        if (prefixResults.length > 0) {
            return NextResponse.json({
                results: prefixResults,
                total: prefixResults.length,
                query,
            });
        }

        // TIER 2: Try contains search if no prefix matches (still uses index)
        // Skipping similarity search as it's too slow for 5M+ cities
        const containsResults = await prisma.$queryRawUnsafe<CityResult[]>(`
            SELECT 
                geonameid, name, "asciiName", country, "countryCode",
                timezone, latitude, longitude, population, continent, admin1
            FROM geo_cities
            WHERE (
                "asciiName" ILIKE '%' || $1 || '%'
                OR name ILIKE '%' || $1 || '%'
            )
            AND population > 1000
            ${whereClause}
            ORDER BY 
                population DESC
            LIMIT ${limit}
        `, query, ...params.slice(1));

        return NextResponse.json({
            results: containsResults,
            total: containsResults.length,
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
