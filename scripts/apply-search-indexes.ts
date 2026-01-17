#!/usr/bin/env node
/**
 * Apply search optimization indexes using Prisma 7's pg adapter
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });
dotenv.config({ path: path.join(__dirname, '../.env') });

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL;
console.log('Connecting to database...');

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function applyIndexes() {
    console.log('Applying search optimization indexes...\n');

    const indexes = [
        {
            name: 'geo_cities_asciiName_population_idx',
            sql: `CREATE INDEX IF NOT EXISTS "geo_cities_asciiName_population_idx" 
                  ON "geo_cities" (LOWER("asciiName") text_pattern_ops, population DESC)`
        },
        {
            name: 'geo_cities_name_population_idx',
            sql: `CREATE INDEX IF NOT EXISTS "geo_cities_name_population_idx" 
                  ON "geo_cities" (LOWER("name") text_pattern_ops, population DESC)`
        },
        {
            name: 'geo_cities_high_pop_idx',
            sql: `CREATE INDEX IF NOT EXISTS "geo_cities_high_pop_idx" 
                  ON "geo_cities" (population DESC) 
                  WHERE population > 100000`
        }
    ];

    for (const index of indexes) {
        try {
            console.log(`Creating index: ${index.name}...`);
            await prisma.$executeRawUnsafe(index.sql);
            console.log(`  ✓ ${index.name} created successfully`);
        } catch (error) {
            console.log(`  ⚠ ${index.name}: ${(error as Error).message}`);
        }
    }

    // Check current record count
    const count = await prisma.$queryRaw<[{ count: bigint }]>`SELECT COUNT(*) as count FROM geo_cities`;
    console.log(`\nTotal cities in database: ${count[0].count.toLocaleString()}`);

    await prisma.$disconnect();
    await pool.end();
    console.log('\nDone!');
}

applyIndexes().catch(console.error);
