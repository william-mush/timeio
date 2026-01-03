// All World Cities - Combined from all phases
// This file is auto-generated

import { WorldCity, WORLD_CITIES as BASE_CITIES, getWorldCityById as baseGetById, getWorldCitiesByCountry as baseGetByCountry, getWorldCitiesByContinent as baseGetByContinent, getUniqueCountries as baseGetCountries } from './world-cities';
import { WORLD_CITIES_PHASE1 } from './world-cities-phase1';
import { WORLD_CITIES_PHASE1_PART2 } from './world-cities-phase1-part2';

// Combine all cities
export const ALL_WORLD_CITIES: WorldCity[] = [
    ...BASE_CITIES,
    ...WORLD_CITIES_PHASE1,
    ...WORLD_CITIES_PHASE1_PART2,
];

// Re-export for convenience
export type { WorldCity };

// Helper function to get city by ID (searches all cities)
export function getAllCityById(id: string): WorldCity | undefined {
    return ALL_WORLD_CITIES.find(city => city.id === id);
}

// Get cities by country
export function getAllCitiesByCountry(countryCode: string): WorldCity[] {
    return ALL_WORLD_CITIES.filter(city => city.countryCode === countryCode);
}

// Get cities by continent
export function getAllCitiesByContinent(continent: string): WorldCity[] {
    return ALL_WORLD_CITIES.filter(city => city.continent === continent);
}

// Get all unique countries with counts
export function getAllUniqueCountries(): { code: string; name: string; count: number }[] {
    const countries = new Map<string, { name: string; count: number }>();
    ALL_WORLD_CITIES.forEach(city => {
        const existing = countries.get(city.countryCode);
        if (existing) {
            existing.count++;
        } else {
            countries.set(city.countryCode, { name: city.country, count: 1 });
        }
    });
    return Array.from(countries.entries()).map(([code, data]) => ({
        code,
        name: data.name,
        count: data.count
    })).sort((a, b) => b.count - a.count);
}

// Statistics
export const CITY_STATS = {
    total: ALL_WORLD_CITIES.length,
    byContinent: {
        asia: ALL_WORLD_CITIES.filter(c => c.continent === 'Asia').length,
        europe: ALL_WORLD_CITIES.filter(c => c.continent === 'Europe').length,
        africa: ALL_WORLD_CITIES.filter(c => c.continent === 'Africa').length,
        northAmerica: ALL_WORLD_CITIES.filter(c => c.continent === 'North America').length,
        southAmerica: ALL_WORLD_CITIES.filter(c => c.continent === 'South America').length,
        oceania: ALL_WORLD_CITIES.filter(c => c.continent === 'Oceania').length,
    }
};
