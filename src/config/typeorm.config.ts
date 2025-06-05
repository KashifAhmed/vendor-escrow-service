import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Vendor } from '../vendor/vendor.entity';
import { Transaction } from '../transaction/transaction.entity';

// Load the appropriate .env file
const envFile = process.env.NODE_ENV === 'docker' ? '.env.docker' : '.env.local';
config({ path: envFile });

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Vendor, Transaction],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // Set to false for production
});
