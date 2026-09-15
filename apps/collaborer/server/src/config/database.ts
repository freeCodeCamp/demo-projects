import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

export function createDatabaseConnection(filePath: string): Database.Database {
  // better-sqlite3 requires the parent directory to already exist.
  mkdirSync(path.dirname(filePath), { recursive: true });
  const db = new Database(filePath);

  // SQLite requires foreign key enforcement to be turned on per connection.
  db.pragma('foreign_keys = ON');
  // WAL mode allows concurrent readers while a write is in progress.
  db.pragma('journal_mode = WAL');

  return db;
}
