#!/usr/bin/env node

/**
 * Import GeoNames allCountries.txt into PostgreSQL
 * 
 * This script imports ~11 million places from GeoNames into the geo_cities table.
 * It uses streaming and batch inserts for efficiency.
 * 
 * Usage:
 *   npx ts-node scripts/geonames/import-all-cities.ts
 * 
 * Prerequisites:
 *   1. Download allCountries.zip from https://download.geonames.org/export/dump/
 *   2. Extract allCountries.txt to scripts/geonames/
 *   3. Run prisma migrate to create the geo_cities table
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// GeoNames allCountries.txt format (tab-separated):
// 0: geonameid, 1: name, 2: asciiname, 3: alternatenames, 4: latitude, 5: longitude,
// 6: feature class, 7: feature code, 8: country code, 9: cc2, 10: admin1 code,
// 11: admin2 code, 12: admin3 code, 13: admin4 code, 14: population, 15: elevation,
// 16: dem, 17: timezone, 18: modification date

// Country codes to continent mapping
const continentMap: Record<string, string> = {
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

// Country code to name mapping
const countryNames: Record<string, string> = {};

// Load country info
async function loadCountryNames() {
    const countryInfoPath = path.join(__dirname, 'countryInfo.txt');
    if (!fs.existsSync(countryInfoPath)) {
        console.log('countryInfo.txt not found, country names will use codes');
        return;
    }

    const data = fs.readFileSync(countryInfoPath, 'utf8');
    data.split('\n').forEach((line: string) => {
        if (line.startsWith('#') || !line.trim()) return;
        const parts = line.split('\t');
        if (parts.length >= 5) {
            countryNames[parts[0]] = parts[4];
        }
    });
    console.log(`Loaded ${Object.keys(countryNames).length} country names`);
}

// Only import places (feature class P) to keep data relevant
const VALID_FEATURE_CLASSES = new Set(['P']); // P = populated places

// Batch size for inserts
const BATCH_SIZE = 5000;

interface CityRecord {
    geonameid: number;
    name: string;
    asciiName: string;
    countryCode: string;
    country: string;
    timezone: string;
    latitude: number;
    longitude: number;
    population: number;
    continent: string;
    featureCode: string | null;
    admin1: string | null;
    elevation: number | null;
}

async function importCities() {
    const filePath = path.join(__dirname, 'allCountries.txt');

    if (!fs.existsSync(filePath)) {
        console.error('allCountries.txt not found!');
        console.log('Please download and extract from: https://download.geonames.org/export/dump/allCountries.zip');
        process.exit(1);
    }

    console.log('Loading country names...');
    await loadCountryNames();

    console.log('Starting import from allCountries.txt...');
    console.log('This will take several minutes for 11M+ records...\n');

    const fileStream = fs.createReadStream(filePath, { encoding: 'utf8' });
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let batch: CityRecord[] = [];
    let totalProcessed = 0;
    let totalInserted = 0;
    let skipped = 0;
    const startTime = Date.now();

    // Function to flush batch to database
    async function flushBatch() {
        if (batch.length === 0) return;

        try {
            await prisma.$executeRawUnsafe(`
        INSERT INTO geo_cities (geonameid, name, "asciiName", "countryCode", country, timezone, latitude, longitude, population, continent, "featureCode", admin1, elevation)
        VALUES ${batch.map(c => `(
          ${c.geonameid},
          ${escapeSql(c.name)},
          ${escapeSql(c.asciiName)},
          ${escapeSql(c.countryCode)},
          ${escapeSql(c.country)},
          ${escapeSql(c.timezone)},
          ${c.latitude},
          ${c.longitude},
          ${c.population},
          ${escapeSql(c.continent)},
          ${c.featureCode ? escapeSql(c.featureCode) : 'NULL'},
          ${c.admin1 ? escapeSql(c.admin1) : 'NULL'},
          ${c.elevation !== null ? c.elevation : 'NULL'}
        )`).join(',\n')}
        ON CONFLICT (geonameid) DO NOTHING
      `);
            totalInserted += batch.length;
        } catch (error) {
            console.error(`Error inserting batch at ${totalProcessed}:`, error);
        }

        batch = [];
    }

    // Process each line
    for await (const line of rl) {
        if (!line.trim()) continue;

        const parts = line.split('\t');
        if (parts.length < 18) continue;

        const featureClass = parts[6];
        const featureCode = parts[7];
        const countryCode = parts[8];
        const timezone = parts[17];

        // Skip non-place features (mountains, rivers, etc.)
        if (!VALID_FEATURE_CLASSES.has(featureClass)) {
            skipped++;
            continue;
        }

        // Skip if no valid timezone
        if (!timezone || timezone === '') {
            skipped++;
            continue;
        }

        const geonameid = parseInt(parts[0]);
        const name = parts[1];
        const asciiName = parts[2] || name;
        const latitude = parseFloat(parts[4]);
        const longitude = parseFloat(parts[5]);
        const population = parseInt(parts[14]) || 0;
        const elevation = parts[15] ? parseInt(parts[15]) : null;
        const admin1 = parts[10] || null;

        batch.push({
            geonameid,
            name,
            asciiName,
            countryCode,
            country: countryNames[countryCode] || countryCode,
            timezone,
            latitude,
            longitude,
            population,
            continent: continentMap[countryCode] || 'Unknown',
            featureCode: featureCode || null,
            admin1,
            elevation,
        });

        totalProcessed++;

        // Flush batch when full
        if (batch.length >= BATCH_SIZE) {
            await flushBatch();

            // Progress update every 100k records
            if (totalProcessed % 100000 === 0) {
                const elapsed = (Date.now() - startTime) / 1000;
                const rate = Math.round(totalProcessed / elapsed);
                console.log(`Processed ${(totalProcessed / 1000000).toFixed(2)}M records (${rate}/sec) - Inserted: ${totalInserted}, Skipped: ${skipped}`);
            }
        }
    }

    // Flush remaining
    await flushBatch();

    const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log('\n========================================');
    console.log(`Import complete!`);
    console.log(`Total processed: ${totalProcessed.toLocaleString()}`);
    console.log(`Total inserted: ${totalInserted.toLocaleString()}`);
    console.log(`Skipped (non-places): ${skipped.toLocaleString()}`);
    console.log(`Time: ${totalTime} seconds`);
    console.log('========================================');

    await prisma.$disconnect();
}

// Escape SQL string
function escapeSql(str: string): string {
    if (!str) return "''";
    return `'${str.replace(/'/g, "''")}'`;
}

// Run the import
importCities().catch(console.error);
