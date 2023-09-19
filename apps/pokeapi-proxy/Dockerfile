FROM node:18-bullseye-slim

WORKDIR /app

# Copy over all the files in the project directory to /app early
# for rollup bundling
COPY . . 

ENV PORT=3000
ENV CACHE_TTL_HOURS=${POKEAPI_PROXY_CACHE_TTL_HOURS}

RUN npm ci

CMD ["npm", "start"]
