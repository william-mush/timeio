'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

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

interface Props {
    centerLat: number;
    centerLng: number;
    cityName: string;
    geonameid?: number;
    countryCode: string;
}

// Dynamically import the map to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import('./CityMapLeaflet'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">Loading map...</span>
        </div>
    ),
});

export function CityMap({ centerLat, centerLng, cityName, geonameid, countryCode }: Props) {
    const [nearbyCities, setNearbyCities] = useState<NearbyCity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchNearbyCities() {
            try {
                setLoading(true);
                const params = new URLSearchParams({
                    lat: centerLat.toString(),
                    lng: centerLng.toString(),
                    radius: '150',
                    limit: '8',
                });
                if (geonameid) {
                    params.set('excludeId', geonameid.toString());
                }

                const response = await fetch(`/api/cities/nearby?${params}`);
                if (!response.ok) throw new Error('Failed to fetch nearby cities');

                const data = await response.json();
                setNearbyCities(data.cities || []);
            } catch (err) {
                console.error('Error fetching nearby cities:', err);
                setError('Could not load nearby cities');
            } finally {
                setLoading(false);
            }
        }

        fetchNearbyCities();
    }, [centerLat, centerLng, geonameid]);

    if (error) {
        return null; // Silently fail - map is optional
    }

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {cityName} & Nearby Cities
            </h3>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <MapComponent
                    centerLat={centerLat}
                    centerLng={centerLng}
                    cityName={cityName}
                    countryCode={countryCode}
                    nearbyCities={nearbyCities}
                />
            </div>

            {/* Nearby Cities List */}
            {nearbyCities.length > 0 && (
                <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Nearby Cities
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {nearbyCities.map((city) => {
                            const slug = `${city.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${city.geonameid}`;
                            return (
                                <Link
                                    key={city.geonameid}
                                    href={`/city/${slug}`}
                                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors group"
                                >
                                    <div className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                        {city.name}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {city.country} • {Math.round(city.distance)} km
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
