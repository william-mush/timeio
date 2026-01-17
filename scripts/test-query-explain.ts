#!/usr/bin/env node
/**
 * Diagnose search query performance
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });
dotenv.config({ path: path.join(__dirname, '../.env') });

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function testQueries() {
    console.log('=== Query Performance Diagnosis ===\n');

    // Test 1: Count tokyo matches
    console.log('1. Counting tokyo prefix matches...');
    const start1 = Date.now();
    const tokyoCount = await prisma.$queryRaw<[{ count: bigint }]>`
        SELECT COUNT(*) as count FROM geo_cities 
        WHERE LOWER("asciiName") LIKE 'tokyo%' OR LOWER(name) LIKE 'tokyo%'
    `;
    console.log(`   Found: ${tokyoCount[0].count} matches in ${Date.now() - start1}ms`);

    // Test 2: Count london matches
    console.log('\n2. Counting london prefix matches...');
    const start2 = Date.now();
    const londonCount = await prisma.$queryRaw<[{ count: bigint }]>`
        SELECT COUNT(*) as count FROM geo_cities 
        WHERE LOWER("asciiName") LIKE 'london%' OR LOWER(name) LIKE 'london%'
    `;
    console.log(`   Found: ${londonCount[0].count} matches in ${Date.now() - start2}ms`);

    // Test 3: Actual tokyo query with timing
    console.log('\n3. Tokyo actual query (no similarity fallback)...');
    const start3 = Date.now();
    const tokyoResults = await prisma.$queryRaw<unknown[]>`
        SELECT geonameid, name, "asciiName", population
        FROM geo_cities
        WHERE LOWER("asciiName") LIKE 'tokyo%' OR LOWER(name) LIKE 'tokyo%'
        ORDER BY CASE WHEN LOWER("asciiName") = 'tokyo' THEN 0 ELSE 1 END, population DESC
        LIMIT 10
    `;
    console.log(`   Returned ${tokyoResults.length} results in ${Date.now() - start3}ms`);
    console.log('   Results:', tokyoResults);

    // Test 4: Check if indexes exist
    console.log('\n4. Checking indexes...');
    const indexes = await prisma.$queryRaw<{ indexname: string }[]>`
        SELECT indexname FROM pg_indexes WHERE tablename = 'geo_cities'
    `;
    console.log('   Indexes:', indexes.map(i => i.indexname).join(', '));

    await prisma.$disconnect();
    await pool.end();
    console.log('\nDone!');
}

testQueries().catch(console.error);
