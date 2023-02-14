FROM node:16-bullseye-slim

WORKDIR /app

# Copy over all the files in the project directory to /app early
# for rollup bundling
COPY . . 

ENV PORT=3000
ENV OPEN_WEATHER_API_KEY=${WEATHER_PROXY_OPEN_WEATHER_API_KEY}

RUN npm ci

CMD ["npm", "start"]
