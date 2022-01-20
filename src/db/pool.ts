import { Pool } from 'pg';

const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT } = process.env;

// Create a pool instance and pass in our config, which we set in our env vars
const pool = new Pool({
  host: PGHOST,
  user: PGUSER,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: Number(PGPORT),
});

export default pool;
