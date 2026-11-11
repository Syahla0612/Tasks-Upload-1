import pg from "pg";

// Satu koneksi pool dipakai bersama agar tidak membanjiri database.
const g = globalThis;

export const pool =
  g._poolTugas ??
  (g._poolTugas = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 8000,
  }));
