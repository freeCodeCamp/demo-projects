import { db } from '../db/index.js';
import { runMigrations } from '../db/migrate.js';

// Runs once per test file (in a beforeAll): the in-memory DB is created fresh
// per file already, since vitest gives each test file its own module
// registry — this just brings it up to the same schema as production.
export function setupTestDatabase(): void {
  runMigrations(db, { silent: true });
}

// Runs between tests (in a beforeEach) so every test starts from an empty,
// schema-only database without paying to recreate the whole in-memory DB and
// re-run every migration each time. Foreign keys are dropped only for the
// duration of the wipe — nothing here runs concurrently with it.
export function resetTestDatabase(): void {
  const tables = (
    db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type = 'table' AND name != 'schema_migrations'"
      )
      .all() as { name: string }[]
  ).map(row => row.name);

  db.pragma('foreign_keys = OFF');
  for (const table of tables) {
    db.exec(`DELETE FROM "${table}";`);
  }
  db.pragma('foreign_keys = ON');
}
