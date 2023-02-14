FROM node:16-bullseye-slim

WORKDIR /app

# Copy over all the files in the project directory to /app early
# for rollup bundling
COPY . . 

ENV PORT=3000
ENV APIKEY=${CHART_THE_STOCK_MARKET_APIKEY}

RUN npm ci

CMD ["npm", "start"]
