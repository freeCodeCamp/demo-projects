# Collaborer

A full-stack project management and collaboration platform: organizations,
projects, a Kanban board, tasks with subtasks/labels/comments/attachments,
notifications, and real-time updates over WebSockets.

## Stack

- **Frontend** (`/`): Astro + React + TypeScript, styled with a hand-built
  CSS design system (`src/global.css`) instead of Tailwind.
- **Backend** (`server/`): Express REST API, layered routes → controllers →
  services → repositories.
- **Database**: SQLite (via `better-sqlite3`), foreign keys enabled.
- **Real-time**: a WebSocket server for push updates only; regular CRUD
  always goes through the REST API.

In local development this is a two-process app: the Astro frontend and the
Express API run and are developed independently, communicating only over
HTTP/WebSocket. The frontend never touches SQLite directly. In production
the two are merged into one process on one port — see
[Production build](#production-build).

## Prerequisites

- Node 24
- pnpm (installing with anything else is blocked by a `preinstall` hook)

## Setup

This repo is a pnpm workspace containing the root Astro app and `server/`.
A single install at the root pulls in both:

```sh
pnpm install
```

Copy the env templates and adjust values if needed (the defaults work for
local development):

```sh
cp .env.example .env
cp server/.env.example server/.env
```

Create the SQLite database and run migrations:

```sh
pnpm --filter server migrate
```

Optionally seed it with demo organizations, projects, tasks, and user
accounts (the seed script prints the demo login credentials when it
finishes):

```sh
pnpm --filter server seed
```

## Running locally

Both processes need to be running. In two separate terminals:

```sh
pnpm --filter server dev   # API on http://localhost:4000
pnpm dev                   # frontend on http://localhost:4321
```

Then visit <http://localhost:4321>.

## Testing, linting, type checking

```sh
pnpm test                    # frontend tests (vitest)
pnpm --filter server test    # backend tests (vitest)
pnpm lint                    # eslint
pnpm format                  # prettier --write
pnpm typecheck               # astro check
```

## Production build

The deploy target expects one process on one port, not the two dev uses.
`server/src/prod.ts` mounts the built Astro app into the same Express app
the API already runs, using `@astrojs/node`'s `"middleware"` adapter mode
(`astro.config.mjs`) rather than Astro's own standalone server:

```sh
pnpm build                    # astro build -> dist/
pnpm --filter server build    # tsc -> server/dist/
pnpm --filter server migrate  # or: node server/dist/db/migrate.js
PORT=3000 node server/dist/prod.js
```

Then visit <http://localhost:3000> — both the API (`/api/v1/...`) and every
page are served from that one port. See the `Dockerfile` for the full
multi-stage build used to produce the deployed image.

## Project structure

- `src/`: Astro pages/layouts and React feature components
  (`src/features/<feature>/{api,types,components}`).
- `server/src/`: Express app: `routes/` → `controllers/` → `services/` →
  `repositories/`, plus `models/`, `middleware/`, `websocket/`.
- `server/db/migrations/`: versioned SQL migrations, run via
  `pnpm --filter server migrate`.
