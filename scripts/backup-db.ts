import { prisma } from '../src/lib/db';
import fs from 'fs';
import path from 'path';

async function backup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(__dirname, '../backups', timestamp);

    if (!fs.existsSync(backupDir)) {
        console.log(`Creating backup directory: ${backupDir}`);
        fs.mkdirSync(backupDir, { recursive: true });
    }

    console.log('Starting database backup...');

    try {
        // 1. Users
        console.log('Backing up Users...');
        const users = await prisma.user.findMany();
        fs.writeFileSync(path.join(backupDir, 'users.json'), JSON.stringify(users, null, 2));

        // 2. Accounts
        console.log('Backing up Accounts...');
        const accounts = await prisma.account.findMany();
        fs.writeFileSync(path.join(backupDir, 'accounts.json'), JSON.stringify(accounts, null, 2));

        // 3. Sessions
        console.log('Backing up Sessions...');
        const sessions = await prisma.session.findMany();
        fs.writeFileSync(path.join(backupDir, 'sessions.json'), JSON.stringify(sessions, null, 2));

        // 4. VerificationTokens
        console.log('Backing up VerificationTokens...');
        const tokens = await prisma.verificationToken.findMany();
        fs.writeFileSync(path.join(backupDir, 'verification_tokens.json'), JSON.stringify(tokens, null, 2));

        // 5. Alarms
        console.log('Backing up Alarms...');
        const alarms = await prisma.alarm.findMany();
        fs.writeFileSync(path.join(backupDir, 'alarms.json'), JSON.stringify(alarms, null, 2));

        // 6. ArchivedAlarms
        console.log('Backing up ArchivedAlarms...');
        const archivedAlarms = await prisma.archivedAlarm.findMany();
        fs.writeFileSync(path.join(backupDir, 'archived_alarms.json'), JSON.stringify(archivedAlarms, null, 2));

        // 7. UserTimeZones
        console.log('Backing up UserTimeZones...');
        const userTimeZones = await prisma.userTimeZone.findMany();
        fs.writeFileSync(path.join(backupDir, 'user_timezones.json'), JSON.stringify(userTimeZones, null, 2));

        // 8. UserSettings
        console.log('Backing up UserSettings...');
        const userSettings = await prisma.userSettings.findMany();
        fs.writeFileSync(path.join(backupDir, 'user_settings.json'), JSON.stringify(userSettings, null, 2));

        // 9. AuthEvents
        console.log('Backing up AuthEvents...');
        const authEvents = await prisma.authEvent.findMany();
        fs.writeFileSync(path.join(backupDir, 'auth_events.json'), JSON.stringify(authEvents, null, 2));

        console.log(`✅ Backup completed successfully in ${backupDir}`);
    } catch (error) {
        console.error('❌ Backup failed:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

backup();
