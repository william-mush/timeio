#!/usr/bin/env node
/**
 * Enable pg_trgm extension for trigram-based fuzzy search
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

async function enablePgTrgm() {
    console.log('Enabling pg_trgm extension...\n');

    try {
        await prisma.$executeRawUnsafe(`CREATE EXTENSION IF NOT EXISTS pg_trgm;`);
        console.log('✓ pg_trgm extension enabled successfully');

        // Test that similarity function works
        const result = await prisma.$queryRaw<[{ sim: number }]>`SELECT similarity('tokyo', 'tokio') as sim`;
        console.log(`✓ similarity() function works! Test: similarity('tokyo', 'tokio') = ${result[0].sim}`);
    } catch (error) {
        console.error('Error enabling pg_trgm:', (error as Error).message);
    }

    await prisma.$disconnect();
    await pool.end();
    console.log('\nDone!');
}

enablePgTrgm().catch(console.error);
