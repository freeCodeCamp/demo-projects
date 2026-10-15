import { fileURLToPath } from 'node:url';
import express from 'express';
import { app } from './app.js';
import { attachWebSocketServer } from './websocket/server.js';

// The production entry point: unlike dev (this app on :4000, the Astro app
// separately on :4321 via `pnpm dev` — see index.ts), the deploy target
// expects one process on one port, so this mounts the built Astro app
// (astro.config.mjs's adapter is in "middleware" mode for exactly this)
// into the same Express app the API already uses.
//
// Appending static/astroHandler after `app` is fully configured (including
// its own error handler, registered right after /api/v1) is deliberate, not
// an oversight: Express skips 4-arg error-handling middleware for a normal
// (non-erroring) request regardless of registration order, so this doesn't
// affect the happy path. An error thrown by the API still hits the custom
// JSON error handler immediately after /api/v1, before reaching here. An
// error thrown while serving a real page falls back to Express's own
// generic error handling instead of the API's JSON one — which is actually
// the correct behavior for an HTML page request, not a gap.
const clientDir = fileURLToPath(new URL('../../dist/client', import.meta.url));
const astroEntryPath = fileURLToPath(
  new URL('../../dist/server/entry.mjs', import.meta.url)
);

const port = Number(process.env.PORT) || 3000;

async function start(): Promise<void> {
  // Dynamic: astroEntryPath only exists after `astro build` has run, and is
  // a computed path — a static import can't reference it.
  const { handler: astroHandler } = (await import(astroEntryPath)) as {
    handler: express.RequestHandler;
  };

  app.use(express.static(clientDir));
  app.use(astroHandler);

  const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  attachWebSocketServer(server);
}

start().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
