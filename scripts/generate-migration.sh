#!/bin/bash

# Make sure we have a migration name
if [ -z "$1" ]; then
    echo "Please provide a migration name"
    echo "Usage: ./scripts/generate-migration.sh MigrationName"
    exit 1
fi

# Remove old migration files
echo "Removing old migration files..."
rm -f src/migrations/*.ts

# Generate new migration
echo "Generating new migration..."
npm run migration:generate -- src/migrations/$1

echo "Migration generated successfully!"
