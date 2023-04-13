FROM node:18-bullseye-slim

WORKDIR /app

# Copy over all the files in the project directory to /app early
# for rollup bundling
COPY . . 

ENV PORT=3000
ENV CACHE_TTL_MINUTES=${STOCK_PRICE_CHECKER_PROXY_CACHE_TTL_MINUTES}
ENV IEX_API_KEY=${STOCK_PRICE_CHECKER_PROXY_IEX_API_KEY}

RUN npm ci

CMD ["npm", "start"]
