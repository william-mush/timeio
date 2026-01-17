// Algolia configuration
// Get your keys from https://dashboard.algolia.com

export const algoliaConfig = {
    appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
    searchApiKey: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || '',
    adminApiKey: process.env.ALGOLIA_ADMIN_KEY || '', // Server-side only
    indexName: 'cities',
};

// Type for city records in Algolia
export interface AlgoliaCityRecord {
    objectID: string; // Required by Algolia
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
    _geoloc?: {
        lat: number;
        lng: number;
    };
}
