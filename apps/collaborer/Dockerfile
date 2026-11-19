FROM node:24-bookworm-slim AS base
WORKDIR /app

FROM base AS deps
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY server/package.json ./server/package.json
# package.json pins the pnpm version via "packageManager", so corepack
# resolves the same version regardless of which stage/COPY runs it.
RUN corepack enable
RUN pnpm install --frozen-lockfile

FROM deps AS build
COPY . .
# Astro bakes PUBLIC_* vars into the client bundle at build time. In prod
# (server/src/prod.ts) the frontend and API are served from the same origin,
# so a relative path is correct here — unlike the dev-only default in
# src/lib/api/client.ts, which points at the separate :4000 dev API process.
ENV PUBLIC_API_URL=/api/v1
RUN pnpm run build
RUN pnpm --filter server run build

FROM base AS runtime
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/server/node_modules ./server/node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/server/dist ./server/dist
COPY --from=build /app/server/db/migrations ./server/db/migrations
EXPOSE 3000
CMD ["sh", "-c", "node server/dist/db/migrate.js && node server/dist/prod.js"]
