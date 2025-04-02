import { PrismaClient } from '@prisma/client'

// This is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['error']
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 