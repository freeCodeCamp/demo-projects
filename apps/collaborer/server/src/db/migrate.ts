import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import type Database from 'better-sqlite3';
import { db } from './index.js';

const migrationsDir = fileURLToPath(
  new URL('../../db/migrations', import.meta.url)
);

function ensureMigrationsTable(database: Database.Database): void {
  database.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    );
  `);
}

// Exported so both the CLI entry point below and the test DB setup helper
// (server/src/test-utils/db.ts) apply the exact same migrations the same
// way — a test DB is only trustworthy if it's schema-identical to the real one.
export function runMigrations(
  database: Database.Database,
  options: { silent?: boolean } = {}
): void {
  const log = options.silent ? () => {} : console.log;

  ensureMigrationsTable(database);

  const applied = new Set(
    (
      database.prepare('SELECT name FROM schema_migrations').all() as {
        name: string;
      }[]
    ).map(row => row.name)
  );

  const files = readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .sort();

  const recordMigration = database.prepare(
    'INSERT INTO schema_migrations (name) VALUES (?)'
  );

  for (const file of files) {
    if (applied.has(file)) continue;

    const sql = readFileSync(path.join(migrationsDir, file), 'utf8');

    database.transaction(() => {
      database.exec(sql);
      recordMigration.run(file);
    })();

    log(`Applied migration: ${file}`);
  }

  log('Migrations up to date.');
}

// Only run as a side effect when this file is executed directly (`pnpm --filter
// server migrate`), not when imported by tests.
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  runMigrations(db);
}
