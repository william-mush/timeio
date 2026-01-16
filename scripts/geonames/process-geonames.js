#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// GeoNames cities15000.txt format (tab-separated):
// 0: geonameid, 1: name, 2: asciiname, 3: alternatenames, 4: latitude, 5: longitude,
// 6: feature class, 7: feature code, 8: country code, 9: cc2, 10: admin1 code,
// 11: admin2 code, 12: admin3 code, 13: admin4 code, 14: population, 15: elevation,
// 16: dem, 17: timezone, 18: modification date

// Country codes to continent mapping
const continentMap = {
    'AF': 'Asia', 'AX': 'Europe', 'AL': 'Europe', 'DZ': 'Africa', 'AS': 'Oceania',
    'AD': 'Europe', 'AO': 'Africa', 'AI': 'North America', 'AQ': 'Antarctica',
    'AG': 'North America', 'AR': 'South America', 'AM': 'Asia', 'AW': 'North America',
    'AU': 'Oceania', 'AT': 'Europe', 'AZ': 'Asia', 'BS': 'North America',
    'BH': 'Asia', 'BD': 'Asia', 'BB': 'North America', 'BY': 'Europe',
    'BE': 'Europe', 'BZ': 'North America', 'BJ': 'Africa', 'BM': 'North America',
    'BT': 'Asia', 'BO': 'South America', 'BA': 'Europe', 'BW': 'Africa',
    'BR': 'South America', 'IO': 'Asia', 'BN': 'Asia', 'BG': 'Europe',
    'BF': 'Africa', 'BI': 'Africa', 'KH': 'Asia', 'CM': 'Africa',
    'CA': 'North America', 'CV': 'Africa', 'KY': 'North America', 'CF': 'Africa',
    'TD': 'Africa', 'CL': 'South America', 'CN': 'Asia', 'CX': 'Oceania',
    'CC': 'Oceania', 'CO': 'South America', 'KM': 'Africa', 'CG': 'Africa',
    'CD': 'Africa', 'CK': 'Oceania', 'CR': 'North America', 'CI': 'Africa',
    'HR': 'Europe', 'CU': 'North America', 'CW': 'North America', 'CY': 'Europe',
    'CZ': 'Europe', 'DK': 'Europe', 'DJ': 'Africa', 'DM': 'North America',
    'DO': 'North America', 'EC': 'South America', 'EG': 'Africa', 'SV': 'North America',
    'GQ': 'Africa', 'ER': 'Africa', 'EE': 'Europe', 'ET': 'Africa',
    'FK': 'South America', 'FO': 'Europe', 'FJ': 'Oceania', 'FI': 'Europe',
    'FR': 'Europe', 'GF': 'South America', 'PF': 'Oceania', 'GA': 'Africa',
    'GM': 'Africa', 'GE': 'Asia', 'DE': 'Europe', 'GH': 'Africa',
    'GI': 'Europe', 'GR': 'Europe', 'GL': 'North America', 'GD': 'North America',
    'GP': 'North America', 'GU': 'Oceania', 'GT': 'North America', 'GG': 'Europe',
    'GN': 'Africa', 'GW': 'Africa', 'GY': 'South America', 'HT': 'North America',
    'VA': 'Europe', 'HN': 'North America', 'HK': 'Asia', 'HU': 'Europe',
    'IS': 'Europe', 'IN': 'Asia', 'ID': 'Asia', 'IR': 'Asia',
    'IQ': 'Asia', 'IE': 'Europe', 'IM': 'Europe', 'IL': 'Asia',
    'IT': 'Europe', 'JM': 'North America', 'JP': 'Asia', 'JE': 'Europe',
    'JO': 'Asia', 'KZ': 'Asia', 'KE': 'Africa', 'KI': 'Oceania',
    'KP': 'Asia', 'KR': 'Asia', 'KW': 'Asia', 'KG': 'Asia',
    'LA': 'Asia', 'LV': 'Europe', 'LB': 'Asia', 'LS': 'Africa',
    'LR': 'Africa', 'LY': 'Africa', 'LI': 'Europe', 'LT': 'Europe',
    'LU': 'Europe', 'MO': 'Asia', 'MK': 'Europe', 'MG': 'Africa',
    'MW': 'Africa', 'MY': 'Asia', 'MV': 'Asia', 'ML': 'Africa',
    'MT': 'Europe', 'MH': 'Oceania', 'MQ': 'North America', 'MR': 'Africa',
    'MU': 'Africa', 'YT': 'Africa', 'MX': 'North America', 'FM': 'Oceania',
    'MD': 'Europe', 'MC': 'Europe', 'MN': 'Asia', 'ME': 'Europe',
    'MS': 'North America', 'MA': 'Africa', 'MZ': 'Africa', 'MM': 'Asia',
    'NA': 'Africa', 'NR': 'Oceania', 'NP': 'Asia', 'NL': 'Europe',
    'NC': 'Oceania', 'NZ': 'Oceania', 'NI': 'North America', 'NE': 'Africa',
    'NG': 'Africa', 'NU': 'Oceania', 'NF': 'Oceania', 'MP': 'Oceania',
    'NO': 'Europe', 'OM': 'Asia', 'PK': 'Asia', 'PW': 'Oceania',
    'PS': 'Asia', 'PA': 'North America', 'PG': 'Oceania', 'PY': 'South America',
    'PE': 'South America', 'PH': 'Asia', 'PN': 'Oceania', 'PL': 'Europe',
    'PT': 'Europe', 'PR': 'North America', 'QA': 'Asia', 'RE': 'Africa',
    'RO': 'Europe', 'RU': 'Europe', 'RW': 'Africa', 'BL': 'North America',
    'SH': 'Africa', 'KN': 'North America', 'LC': 'North America', 'MF': 'North America',
    'PM': 'North America', 'VC': 'North America', 'WS': 'Oceania', 'SM': 'Europe',
    'ST': 'Africa', 'SA': 'Asia', 'SN': 'Africa', 'RS': 'Europe',
    'SC': 'Africa', 'SL': 'Africa', 'SG': 'Asia', 'SX': 'North America',
    'SK': 'Europe', 'SI': 'Europe', 'SB': 'Oceania', 'SO': 'Africa',
    'ZA': 'Africa', 'GS': 'Antarctica', 'SS': 'Africa', 'ES': 'Europe',
    'LK': 'Asia', 'SD': 'Africa', 'SR': 'South America', 'SJ': 'Europe',
    'SZ': 'Africa', 'SE': 'Europe', 'CH': 'Europe', 'SY': 'Asia',
    'TW': 'Asia', 'TJ': 'Asia', 'TZ': 'Africa', 'TH': 'Asia',
    'TL': 'Asia', 'TG': 'Africa', 'TK': 'Oceania', 'TO': 'Oceania',
    'TT': 'North America', 'TN': 'Africa', 'TR': 'Asia', 'TM': 'Asia',
    'TC': 'North America', 'TV': 'Oceania', 'UG': 'Africa', 'UA': 'Europe',
    'AE': 'Asia', 'GB': 'Europe', 'US': 'North America', 'UM': 'Oceania',
    'UY': 'South America', 'UZ': 'Asia', 'VU': 'Oceania', 'VE': 'South America',
    'VN': 'Asia', 'VG': 'North America', 'VI': 'North America', 'WF': 'Oceania',
    'EH': 'Africa', 'YE': 'Asia', 'ZM': 'Africa', 'ZW': 'Africa',
    'XK': 'Europe'
};

// Read country info for full country names
const countryNames = {};
const countryData = fs.readFileSync(path.join(__dirname, 'countryInfo.txt'), 'utf8');
countryData.split('\n').forEach(line => {
    if (line.startsWith('#') || !line.trim()) return;
    const parts = line.split('\t');
    if (parts.length >= 5) {
        countryNames[parts[0]] = parts[4]; // ISO code -> Country name
    }
});

// Read cities
const citiesData = fs.readFileSync(path.join(__dirname, 'cities15000.txt'), 'utf8');
const cities = [];

citiesData.split('\n').forEach(line => {
    if (!line.trim()) return;
    const parts = line.split('\t');
    if (parts.length < 18) return;

    const geonameid = parts[0];
    const name = parts[1];
    const asciiname = parts[2];
    const lat = parseFloat(parts[4]);
    const lng = parseFloat(parts[5]);
    const countryCode = parts[8];
    const population = parseInt(parts[14]) || 0;
    const timezone = parts[17];

    // Skip if no valid timezone
    if (!timezone || timezone === '') return;

    // Generate a slug-friendly ID
    const slug = `${asciiname.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}-${countryCode.toLowerCase()}`;

    cities.push({
        id: slug,
        geonameid: parseInt(geonameid),
        city: name,
        asciiName: asciiname,
        country: countryNames[countryCode] || countryCode,
        countryCode: countryCode,
        coordinates: [lng, lat],
        population: population,
        timezone: timezone,
        continent: continentMap[countryCode] || 'Unknown'
    });
});

// Sort by population descending
cities.sort((a, b) => b.population - a.population);

console.log(`Total cities processed: ${cities.length}`);

// Split into chunks for better bundle splitting
const TOP_CITIES_COUNT = 500;
const CHUNK_SIZE = 5000;

// Top 500 cities (loaded immediately)
const topCities = cities.slice(0, TOP_CITIES_COUNT);

// Generate TypeScript for top cities
const topCitiesTs = `// Top ${TOP_CITIES_COUNT} world cities by population
// Auto-generated from GeoNames data - ${new Date().toISOString().split('T')[0]}

export interface GeoCity {
  id: string;
  city: string;
  asciiName: string;
  country: string;
  countryCode: string;
  coordinates: [number, number];
  population: number;
  timezone: string;
  continent: string;
}

export const TOP_CITIES: GeoCity[] = ${JSON.stringify(topCities, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../../src/data/geonames-top-cities.ts'), topCitiesTs);
console.log(`Written: geonames-top-cities.ts (${TOP_CITIES_COUNT} cities)`);

// All cities (lazy loaded)
const allCitiesTs = `// All ${cities.length} world cities with population 15,000+
// Auto-generated from GeoNames data - ${new Date().toISOString().split('T')[0]}

import type { GeoCity } from './geonames-top-cities';

export const ALL_GEONAMES_CITIES: GeoCity[] = ${JSON.stringify(cities, null, 2)};

// Helper functions
export function searchCities(query: string, limit: number = 50): GeoCity[] {
  if (!query.trim()) return ALL_GEONAMES_CITIES.slice(0, limit);
  const q = query.toLowerCase();
  return ALL_GEONAMES_CITIES
    .filter(c => c.city.toLowerCase().includes(q) || c.country.toLowerCase().includes(q) || c.asciiName.toLowerCase().includes(q))
    .slice(0, limit);
}

export function getCityById(id: string): GeoCity | undefined {
  return ALL_GEONAMES_CITIES.find(c => c.id === id);
}

export function getCitiesByCountry(countryCode: string): GeoCity[] {
  return ALL_GEONAMES_CITIES.filter(c => c.countryCode === countryCode);
}

export function getCitiesByContinent(continent: string): GeoCity[] {
  return ALL_GEONAMES_CITIES.filter(c => c.continent === continent);
}

// Stats
export const GEONAMES_STATS = {
  totalCities: ${cities.length},
  countries: ${Object.keys(cities.reduce((acc, c) => { acc[c.countryCode] = true; return acc; }, {})).length},
  lastUpdated: '${new Date().toISOString().split('T')[0]}'
};
`;

fs.writeFileSync(path.join(__dirname, '../../src/data/geonames-all-cities.ts'), allCitiesTs);
console.log(`Written: geonames-all-cities.ts (${cities.length} cities)`);

// Summary by continent
const byContinentSummary = {};
cities.forEach(c => {
    byContinentSummary[c.continent] = (byContinentSummary[c.continent] || 0) + 1;
});
console.log('\nCities by continent:');
Object.entries(byContinentSummary).sort((a, b) => b[1] - a[1]).forEach(([continent, count]) => {
    console.log(`  ${continent}: ${count}`);
});

// Country count
const countries = new Set(cities.map(c => c.countryCode));
console.log(`\nTotal countries: ${countries.size}`);
