#!/usr/bin/env node

const { execSync } = require('child_process');

function runCommand(command, description) {
  try {
    console.log(`Running: ${description}`);
    execSync(command, { stdio: 'inherit' });
    console.log(`✓ ${description} completed successfully`);
  } catch (error) {
    console.error(`✗ ${description} failed:`, error.message);
    throw error;
  }
}

function runCommandOptional(command, description, skipMessage) {
  try {
    console.log(`Running: ${description}`);
    execSync(command, { stdio: 'inherit' });
    console.log(`✓ ${description} completed successfully`);
    return true;
  } catch (error) {
    console.log(`⚠ ${skipMessage}`);
    return false;
  }
}

async function build() {
  console.log('🚀 Starting build process...\n');

  // Always generate Prisma client
  runCommand('npx prisma generate', 'Generating Prisma client');

  // Check if DATABASE_URL exists and try to push schema
  if (process.env.DATABASE_URL) {
    console.log('\n📊 DATABASE_URL found, pushing database schema...');
    runCommand('npx prisma db push', 'Pushing database schema');
  } else {
    console.log('\n⚠ No DATABASE_URL found, skipping database operations...');
    console.log('This is normal for static deployments that don\'t require database features.');
  }

  // Build the Next.js application
  console.log('\n🏗️ Building Next.js application...');
  runCommand('npx next build', 'Building Next.js application');

  console.log('\n🎉 Build completed successfully!');
}

build().catch((error) => {
  console.error('\n❌ Build failed:', error.message);
  process.exit(1);
});