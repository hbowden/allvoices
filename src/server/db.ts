import {Pool, PoolClient } from 'pg';
let alreadyRan = false;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres'
  });
let client: PoolClient;

export async function getDatabaseConnection() {
    if(alreadyRan) {
        return client;
    } else {
        client = await pool.connect();
        return client;
    }
}