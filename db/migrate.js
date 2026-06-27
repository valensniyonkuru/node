require('dotenv').config();
const { Client } = require('pg');

async function migrate() {
  // Step 1: Connect to default 'postgres' db to create crud_db if needed
  const adminClient = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: 'postgres',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  await adminClient.connect();

  const dbName = process.env.DB_NAME;
  const exists = await adminClient.query(
    `SELECT 1 FROM pg_database WHERE datname = $1`,
    [dbName]
  );

  if (exists.rowCount === 0) {
    await adminClient.query(`CREATE DATABASE "${dbName}"`);
    console.log(`Database '${dbName}' created.`);
  } else {
    console.log(`Database '${dbName}' already exists.`);
  }

  await adminClient.end();

  // Step 2: Connect to crud_db and create the items table
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: dbName,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  await client.connect();

  await client.query(`
    CREATE TABLE IF NOT EXISTS items (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name        VARCHAR(255) NOT NULL,
      description TEXT,
      created_at  TIMESTAMP DEFAULT NOW(),
      updated_at  TIMESTAMP DEFAULT NOW()
    )
  `);

  console.log("Table 'items' is ready.");
  await client.end();
  console.log('Migration complete.');
  process.exit(0);
}

migrate().catch((err) => {
  console.error('Migration failed:', err.message);
  process.exit(1);
});
