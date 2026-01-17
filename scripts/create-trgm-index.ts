#!/usr/bin/env node
/**
 * Create trigram GIN index for fast LIKE queries
 * This enables pg_trgm to accelerate prefix searches
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

async function createTrigramIndex() {
    console.log('Creating trigram GIN indexes for fast LIKE queries...\n');

    // Create GIN index using pg_trgm on asciiName
    console.log('1. Creating GIN trigram index on asciiName...');
    const start1 = Date.now();
    try {
        await prisma.$executeRawUnsafe(`
            CREATE INDEX CONCURRENTLY IF NOT EXISTS 
            geo_cities_asciiName_trgm_idx 
            ON geo_cities USING GIN ("asciiName" gin_trgm_ops)
        `);
        console.log(`   ✓ Created in ${((Date.now() - start1) / 1000).toFixed(1)}s`);
    } catch (error) {
        console.log(`   ⚠ ${(error as Error).message}`);
    }

    // Create GIN index using pg_trgm on name
    console.log('\n2. Creating GIN trigram index on name...');
    const start2 = Date.now();
    try {
        await prisma.$executeRawUnsafe(`
            CREATE INDEX CONCURRENTLY IF NOT EXISTS 
            geo_cities_name_trgm_idx 
            ON geo_cities USING GIN (name gin_trgm_ops)
        `);
        console.log(`   ✓ Created in ${((Date.now() - start2) / 1000).toFixed(1)}s`);
    } catch (error) {
        console.log(`   ⚠ ${(error as Error).message}`);
    }

    // Verify indexes
    console.log('\n3. Verifying indexes...');
    const indexes = await prisma.$queryRaw<{ indexname: string }[]>`
        SELECT indexname FROM pg_indexes 
        WHERE tablename = 'geo_cities' AND indexname LIKE '%trgm%'
    `;
    console.log('   Trigram indexes:', indexes.map(i => i.indexname).join(', ') || 'None');

    // Test query performance after index
    console.log('\n4. Testing query performance...');
    const start3 = Date.now();
    await prisma.$queryRaw`
        SELECT geonameid, name, "asciiName", population
        FROM geo_cities
        WHERE "asciiName" ILIKE 'tokyo%'
        ORDER BY population DESC
        LIMIT 10
    `;
    console.log(`   'tokyo' prefix query: ${Date.now() - start3}ms`);

    await prisma.$disconnect();
    await pool.end();
    console.log('\nDone!');
}

createTrigramIndex().catch(console.error);
