# Vendor Escrow Service

A secure NestJS-based escrow service that facilitates transactions between vendors and customers using Stripe integration.

## Features

- Vendor management system
- Transaction processing with Stripe integration
- Secure escrow functionality
- RESTful API endpoints

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

## Running the Application

### Development Mode

#### Option 1: Run DB in Docker, NestJS locally
```bash
# Start PostgreSQL in Docker
docker-compose up -d postgres

# Start NestJS application
NODE_ENV=local npm run start:dev
```

#### Option 2: Run everything in Docker
```bash
# Build and start all services
docker-compose up --build
```

## Project Structure

- `src/` - Source code directory
  - `stripe/` - Stripe integration module
  - `transaction/` - Transaction management module
  - `vendor/` - Vendor management module

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
