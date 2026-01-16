import { PrismaClient } from '@prisma/client'

// This is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = process.env.DATABASE_URL

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  adapter,
  log: ['error']
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 