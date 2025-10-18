import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema'

// Ensure this only runs on server-side
if (typeof window !== 'undefined') {
  throw new Error('Database connection should only be used on the server');
}

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, {
  max: 1,
  ssl: 'require'
});
export const db = drizzle(client, {schema});