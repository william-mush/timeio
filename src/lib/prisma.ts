import { PrismaClient } from '@prisma/client';

// Prisma 6 handles env vars automatically via schema
const prisma = new PrismaClient();

export default prisma;