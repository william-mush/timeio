import { TOP_CITIES, SEARCH_INDEX } from '@/data/top-cities-search';

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

function toResult(c: typeof TOP_CITIES[number]): SearchResult {
  return {
    geonameid: c.geonameid,
    name: c.name,
    asciiName: c.asciiName,
    country: c.country,
    countryCode: c.countryCode,
    timezone: c.timezone,
    latitude: 0,
    longitude: 0,
    population: c.population,
    continent: c.continent,
    admin1: c.admin1,
  };
}

export function searchCitiesLocal(query: string, limit = 30): SearchResult[] {
  if (!query) {
    // No query: return top cities by population (already sorted)
    return TOP_CITIES.slice(0, limit).map(toResult);
  }

  const q = query.toLowerCase();

  // Use precomputed lowercase index for fast matching
  const matches: { city: typeof TOP_CITIES[number]; exact: boolean }[] = [];
  for (const entry of SEARCH_INDEX) {
    if (entry.ascii.startsWith(q) || entry.name.startsWith(q)) {
      const city = TOP_CITIES[entry.idx];
      matches.push({ city, exact: entry.ascii === q });
    }
  }

  // Sort: exact matches first, then by population (already desc in data)
  matches.sort((a, b) => {
    if (a.exact !== b.exact) return a.exact ? -1 : 1;
    return b.city.population - a.city.population;
  });

  return matches.slice(0, limit).map(m => toResult(m.city));
}
