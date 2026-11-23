FROM node:26-bookworm-slim

WORKDIR /app

RUN npm install --global npm@12.2.2

# Copy over all the files in the project directory to /app early
# for rollup bundling
COPY . . 

ENV PORT=3000
ENV APIKEY=${CHART_THE_STOCK_MARKET_APIKEY}

RUN npm ci

CMD ["npm", "start"]
