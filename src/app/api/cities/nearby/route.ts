import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

interface NearbyCity {
    geonameid: number;
    name: string;
    country: string;
    countryCode: string;
    timezone: string;
    latitude: number;
    longitude: number;
    population: number;
    distance: number;
}

// Haversine formula to calculate distance between two points
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const lat = parseFloat(searchParams.get('lat') || '0');
        const lng = parseFloat(searchParams.get('lng') || '0');
        const excludeId = parseInt(searchParams.get('excludeId') || '0');
        const radiusKm = parseFloat(searchParams.get('radius') || '150');
        const limit = parseInt(searchParams.get('limit') || '10');

        if (!lat || !lng) {
            return NextResponse.json({ error: 'lat and lng are required' }, { status: 400 });
        }

        // Calculate bounding box for initial filtering (rough approximation)
        // 1 degree latitude ≈ 111km
        const latDelta = radiusKm / 111;
        const lngDelta = radiusKm / (111 * Math.cos(lat * Math.PI / 180));

        // Query cities within bounding box with minimum population
        const cities = await prisma.geoCity.findMany({
            where: {
                latitude: {
                    gte: lat - latDelta,
                    lte: lat + latDelta,
                },
                longitude: {
                    gte: lng - lngDelta,
                    lte: lng + lngDelta,
                },
                geonameid: excludeId ? { not: excludeId } : undefined,
                population: { gte: 5000 }, // Only cities with 5k+ population
            },
            select: {
                geonameid: true,
                name: true,
                country: true,
                countryCode: true,
                timezone: true,
                latitude: true,
                longitude: true,
                population: true,
            },
            orderBy: { population: 'desc' },
            take: 100, // Get more to filter by actual distance
        });

        // Calculate actual distances and filter
        const nearbyCities: NearbyCity[] = cities
            .map(city => ({
                ...city,
                distance: calculateDistance(lat, lng, city.latitude, city.longitude),
            }))
            .filter(city => city.distance <= radiusKm && city.distance > 0)
            .sort((a, b) => b.population - a.population)
            .slice(0, limit);

        return NextResponse.json({
            cities: nearbyCities,
            center: { lat, lng },
            radiusKm,
        });
    } catch (error) {
        console.error('Error fetching nearby cities:', error);
        return NextResponse.json({ error: 'Failed to fetch nearby cities' }, { status: 500 });
    }
}
