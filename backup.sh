#!/bin/bash

# Ensure we are in the project root
cd "$(dirname "$0")"

echo "Running backup script..."
# Use ts-node to run the backup script
# We accept an optional argument for the environment file, defaulting to .env
if [ -f .env.local ]; then
    echo "Loading .env.local..."
    export $(grep -v '^#' .env.local | xargs)
elif [ -f .env ]; then
    echo "Loading .env..."
    export $(grep -v '^#' .env | xargs)
fi

# Run the typescript script using npx
npx ts-node scripts/backup-db.ts
