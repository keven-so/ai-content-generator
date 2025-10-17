import 'dotenv/config'

/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:54331/postgres',
    }
  };
  