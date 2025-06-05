# Vendor Escrow Service

A secure NestJS-based escrow service that facilitates transactions between vendors and customers using Stripe integration.

## Features

- Secure vendor management with Stripe integration
- Automatic Stripe customer creation
- Transaction processing with escrow functionality
- PostgreSQL database with TypeORM
- RESTful API with Swagger documentation
- Docker support for easy deployment

## Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose
- PostgreSQL
- Stripe account (for payment processing)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local` for local development
   - Copy `.env.docker.example` to `.env.docker` for Docker deployment
   - Update the environment variables with your configuration

## Database Migrations

The project uses TypeORM migrations to manage database schema. Available commands:

```bash
# Create a new migration
npm run migration:create -- src/migrations/MigrationName

# Generate migration from entity changes
npm run migration:generate -- src/migrations/MigrationName

# Run pending migrations
NODE_ENV=local npm run migration:run

# Revert last migration
NODE_ENV=local npm run migration:revert
```

## Running the Application

### Option 1: Run DB in Docker, NestJS locally
```bash
# Start PostgreSQL in Docker
docker-compose up -d postgres

# Start NestJS application
NODE_ENV=local npm run start:dev
```

### Option 2: Run everything in Docker
```bash
# Build and start all services
docker-compose up --build
```

## API Documentation

Once the application is running, you can access the Swagger API documentation at:
```
http://localhost:3000/api
```

## Project Structure

```
src/
├── vendor/         # Vendor management module
├── transaction/    # Transaction processing module
├── stripe/        # Stripe integration module
├── migrations/    # Database migrations
└── config/        # Application configuration
```

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## License

This project is licensed under the MIT License.
