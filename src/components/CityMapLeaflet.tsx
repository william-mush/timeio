'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
    countryCode: string;
    nearbyCities: NearbyCity[];
}

// Custom marker icons
const createIcon = (color: string, size: number = 24) => {
    return L.divIcon({
        className: 'custom-marker',
        html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      "></div>
    `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        popupAnchor: [0, -size / 2],
    });
};

const mainCityIcon = createIcon('#3b82f6', 28); // Blue, larger
const nearbyCityIcon = createIcon('#10b981', 20); // Green, smaller

// Component to get current time for a timezone
function CityTime({ timezone }: { timezone: string }) {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            try {
                const now = new Date();
                setTime(now.toLocaleTimeString('en-US', {
                    timeZone: timezone,
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                }));
            } catch {
                setTime('--:--');
            }
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [timezone]);

    return <span className="font-mono">{time}</span>;
}

// Auto-fit bounds component
function FitBounds({ center, nearbyCities }: { center: [number, number]; nearbyCities: NearbyCity[] }) {
    const map = useMap();

    useEffect(() => {
        if (nearbyCities.length === 0) {
            map.setView(center, 10);
            return;
        }

        const points: [number, number][] = [center];
        nearbyCities.forEach(city => {
            points.push([city.latitude, city.longitude]);
        });

        const bounds = L.latLngBounds(points);
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 });
    }, [map, center, nearbyCities]);

    return null;
}

export default function CityMapLeaflet({ centerLat, centerLng, cityName, countryCode, nearbyCities }: Props) {
    const center: [number, number] = [centerLat, centerLng];

    return (
        <MapContainer
            center={center}
            zoom={10}
            style={{ height: '300px', width: '100%' }}
            scrollWheelZoom={false}
            className="z-0"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FitBounds center={center} nearbyCities={nearbyCities} />

            {/* Main city marker */}
            <Marker position={center} icon={mainCityIcon}>
                <Popup>
                    <div className="text-center">
                        <div className="font-bold text-lg">{cityName}</div>
                        <div className="text-gray-600">{countryCode}</div>
                    </div>
                </Popup>
            </Marker>

            {/* Nearby cities markers */}
            {nearbyCities.map((city) => (
                <Marker
                    key={city.geonameid}
                    position={[city.latitude, city.longitude]}
                    icon={nearbyCityIcon}
                >
                    <Popup>
                        <div className="text-center min-w-[120px]">
                            <div className="font-bold">{city.name}</div>
                            <div className="text-gray-600 text-sm">{city.country}</div>
                            <div className="text-blue-600 font-medium mt-1">
                                <CityTime timezone={city.timezone} />
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                {Math.round(city.distance)} km away
                            </div>
                            <a
                                href={`/city/${city.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${city.geonameid}`}
                                className="text-xs text-blue-500 hover:underline mt-1 block"
                            >
                                View city →
                            </a>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
