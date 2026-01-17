/**
 * Sync all cities from PostgreSQL to Algolia
 * Run with: npx tsx scripts/sync-algolia.ts
 */

import { algoliasearch } from 'algoliasearch';
import { prisma } from '../src/lib/prisma';
import { algoliaConfig, type AlgoliaCityRecord } from '../src/lib/algolia';

async function syncToAlgolia() {
    console.log('Starting Algolia sync...');

    // Check for required env vars
    if (!algoliaConfig.appId || !algoliaConfig.adminApiKey) {
        console.error('Missing Algolia credentials. Set NEXT_PUBLIC_ALGOLIA_APP_ID and ALGOLIA_ADMIN_KEY');
        process.exit(1);
    }

    // Initialize Algolia client
    const client = algoliasearch(algoliaConfig.appId, algoliaConfig.adminApiKey);

    // Fetch all cities from database
    console.log('Fetching cities from database...');
    const cities = await prisma.geoCity.findMany({
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
        orderBy: { population: 'desc' },
    });

    console.log(`Found ${cities.length} cities`);

    // Transform to Algolia records
    const records: AlgoliaCityRecord[] = cities.map(city => ({
        objectID: city.geonameid.toString(),
        geonameid: city.geonameid,
        name: city.name,
        asciiName: city.asciiName,
        country: city.country,
        countryCode: city.countryCode,
        timezone: city.timezone,
        latitude: city.latitude,
        longitude: city.longitude,
        population: city.population,
        continent: city.continent,
        admin1: city.admin1,
        _geoloc: {
            lat: city.latitude,
            lng: city.longitude,
        },
    }));

    // Upload in batches of 1000
    const BATCH_SIZE = 1000;
    console.log(`Uploading ${records.length} records in batches of ${BATCH_SIZE}...`);

    for (let i = 0; i < records.length; i += BATCH_SIZE) {
        const batch = records.slice(i, i + BATCH_SIZE);
        await client.saveObjects({
            indexName: algoliaConfig.indexName,
            objects: batch as unknown as Record<string, unknown>[],
        });
        console.log(`Uploaded ${Math.min(i + BATCH_SIZE, records.length)} / ${records.length}`);
    }

    // Configure index settings
    console.log('Configuring index settings...');
    await client.setSettings({
        indexName: algoliaConfig.indexName,
        indexSettings: {
            searchableAttributes: [
                'name',
                'asciiName',
                'country',
                'admin1',
            ],
            customRanking: ['desc(population)'],
            attributesForFaceting: [
                'filterOnly(countryCode)',
                'filterOnly(continent)',
            ],
            typoTolerance: true,
            minWordSizefor1Typo: 3,
            minWordSizefor2Typos: 6,
        },
    });

    console.log('✅ Algolia sync complete!');
}

syncToAlgolia()
    .catch(console.error)
    .finally(() => process.exit());
