import { TOP_CITIES } from '@/data/geonames-top-cities';

interface SearchResult {
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

export function searchCitiesLocal(query: string, limit = 30): SearchResult[] {
  const q = query.toLowerCase();

  const matches = TOP_CITIES.filter(
    c => c.asciiName.toLowerCase().startsWith(q) || c.city.toLowerCase().startsWith(q)
  );

  matches.sort((a, b) => {
    const aExact = a.asciiName.toLowerCase() === q ? 0 : 1;
    const bExact = b.asciiName.toLowerCase() === q ? 0 : 1;
    if (aExact !== bExact) return aExact - bExact;
    return b.population - a.population;
  });

  return matches.slice(0, limit).map(c => ({
    geonameid: c.geonameid,
    name: c.city,
    asciiName: c.asciiName,
    country: c.country,
    countryCode: c.countryCode,
    timezone: c.timezone,
    latitude: c.coordinates[1],
    longitude: c.coordinates[0],
    population: c.population,
    continent: c.continent,
    admin1: null,
  }));
}
