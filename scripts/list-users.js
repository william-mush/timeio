// Script to list all users and their authentication methods
// Run with: node scripts/list-users.js

require('dotenv').config({ path: '.env.local' })
const { Pool } = require('pg')
const { PrismaPg } = require('@prisma/adapter-pg')
const { PrismaClient } = require('@prisma/client')

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
    adapter,
    log: ['error']
})

async function listUsers() {
    console.log('\n📊 TIME.IO USER DATABASE OVERVIEW\n')
    console.log('='.repeat(80))

    // Get all users with their accounts
    const users = await prisma.user.findMany({
        include: {
            accounts: {
                select: {
                    provider: true,
                    type: true,
                },
            },
            _count: {
                select: {
                    alarms: true,
                    timeZones: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    console.log(`\n👥 Total Users: ${users.length}\n`)

    // Categorize users
    const stats = {
        oauthOnly: 0,
        credentialsOnly: 0,
        both: 0,
    }

    for (const user of users) {
        const hasPassword = !!user.password
        const oauthProviders = user.accounts.map(a => a.provider)
        const hasOauth = oauthProviders.length > 0

        let authType = ''
        if (hasPassword && hasOauth) {
            authType = '🔗 Both (Credentials + OAuth)'
            stats.both++
        } else if (hasPassword) {
            authType = '🔑 Credentials Only'
            stats.credentialsOnly++
        } else if (hasOauth) {
            authType = `🌐 OAuth Only (${oauthProviders.join(', ')})`
            stats.oauthOnly++
        } else {
            authType = '❓ No auth method'
        }

        console.log(`┌─ User: ${user.email || 'No email'}`)
        console.log(`│  ID: ${user.id}`)
        console.log(`│  Name: ${user.name || 'Not set'}`)
        console.log(`│  Auth: ${authType}`)
        console.log(`│  Created: ${user.createdAt.toLocaleDateString()}`)
        console.log(`│  Alarms: ${user._count.alarms} | Time Zones: ${user._count.timeZones}`)
        console.log(`└${'─'.repeat(70)}\n`)
    }

    console.log('='.repeat(80))
    console.log('\n📈 SUMMARY:\n')
    console.log(`   🌐 OAuth Only:       ${stats.oauthOnly}`)
    console.log(`   🔑 Credentials Only: ${stats.credentialsOnly}`)
    console.log(`   🔗 Both Methods:     ${stats.both}`)
    console.log(`   ─────────────────────`)
    console.log(`   📊 Total:            ${users.length}\n`)
}

listUsers()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error('Error:', e)
        process.exit(1)
    })
    .finally(() => Promise.all([prisma.$disconnect(), pool.end()]))
