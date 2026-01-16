#!/usr/bin/env node

import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.join(__dirname, '../../.env.local') });
dotenv.config({ path: path.join(__dirname, '../../.env') });

import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function verify() {
    const count = await prisma.geoCity.count();
    console.log('Total cities in geo_cities table:', count.toLocaleString());

    const sample = await prisma.geoCity.findMany({
        take: 10,
        orderBy: { population: 'desc' },
        select: { name: true, country: true, timezone: true, population: true, continent: true }
    });
    console.log('\nTop 10 cities by population:');
    sample.forEach((c, i) =>
        console.log(`  ${i + 1}. ${c.name}, ${c.country} (${c.continent}) - Pop: ${c.population.toLocaleString()} - TZ: ${c.timezone}`)
    );

    const byContinent = await prisma.$queryRaw`
    SELECT continent, COUNT(*) as count 
    FROM geo_cities 
    GROUP BY continent 
    ORDER BY count DESC
  `;
    console.log('\nCities by continent:');
    (byContinent as any[]).forEach(row =>
        console.log(`  ${row.continent}: ${Number(row.count).toLocaleString()}`)
    );

    await prisma.$disconnect();
    await pool.end();
}

verify().catch(console.error);
