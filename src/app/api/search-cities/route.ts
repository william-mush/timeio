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

        // TIER 1: Fast prefix search (uses btree index - very fast!)
        const prefixResults = await prisma.$queryRawUnsafe<CityResult[]>(`
            SELECT 
                geonameid, name, "asciiName", country, "countryCode",
                timezone, latitude, longitude, population, continent, admin1
            FROM geo_cities
            WHERE (
                LOWER("asciiName") LIKE $1 || '%'
                OR LOWER(name) LIKE $1 || '%'
            )
            ${whereClause}
            ORDER BY 
                CASE WHEN LOWER("asciiName") = $1 THEN 0 ELSE 1 END,
                population DESC
            LIMIT ${limit}
        `, ...params);

        // If we have ANY prefix results, return them immediately (fast path)
        if (prefixResults.length > 0) {
            return NextResponse.json({
                results: prefixResults,
                total: prefixResults.length,
                query,
            });
        }

        // TIER 2: Only use similarity if NO prefix matches found
        // This handles typos like "tokio" -> "Tokyo"
        const similarityResults = await prisma.$queryRawUnsafe<CityResult[]>(`
            SELECT 
                geonameid, name, "asciiName", country, "countryCode",
                timezone, latitude, longitude, population, continent, admin1
            FROM geo_cities
            WHERE population > 10000
            AND similarity("asciiName", $1) > 0.3
            ${whereClause}
            ORDER BY 
                similarity("asciiName", $1) DESC,
                population DESC
            LIMIT ${limit}
        `, ...params);

        // Merge: prefix matches first, then similarity matches
        const seenIds = new Set(prefixResults.map(r => r.geonameid));
        const mergedResults = [...prefixResults];

        for (const city of similarityResults) {
            if (!seenIds.has(city.geonameid) && mergedResults.length < limit) {
                mergedResults.push(city);
                seenIds.add(city.geonameid);
            }
        }

        return NextResponse.json({
            results: mergedResults,
            total: mergedResults.length,
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
