export {}; // force module context so top-level await is unambiguous everywhere this is type-checked from

// vitest setupFiles run before a test file's own imports — critically, before
// `src/config/env.ts` (and therefore `src/db/index.ts`, a module-level
// singleton created from `env.DATABASE_URL` at import time) is ever imported.
// `env.ts` calls `process.loadEnvFile()`, which reads `server/.env` but never
// overwrites variables already present in `process.env` — so setting these
// here first is what makes the real dev `.env` file harmless to the test run.
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = ':memory:';
process.env.AUTH_SECRET = 'test-secret';
process.env.STORAGE_PATH = './storage-test';

// Every repository module prepares its statements eagerly at import time
// (`db.prepare(...)` at module scope), which throws immediately if the
// table doesn't exist yet — so migrations must run here, before the test
// file's own imports pull in any repository, not in a per-file beforeAll.
const { setupTestDatabase } = await import('./db.js');
setupTestDatabase();
