import path from 'node:path'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
    schema: path.join(__dirname, 'schema.prisma'),

    // Required for Prisma 7 CLI commands (db push, migrate, etc.)
    datasource: {
        url: env('DATABASE_URL'),
    },
})



