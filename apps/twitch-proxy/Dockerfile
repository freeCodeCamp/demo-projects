FROM node:16-bullseye-slim

WORKDIR /app

# Copy over all the files in the project directory to /app early
# for rollup bundling
COPY . . 

ENV PORT=3000
ENV TWITCH_CLIENT_ID=${TWITCH_PROXY_TWITCH_CLIENT_ID}
ENV TWITCH_CLIENT_SECRET=${TWITCH_PROXY_TWITCH_CLIENT_SECRET}

RUN npm ci

CMD ["npm", "start"]
