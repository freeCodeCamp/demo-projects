FROM node:16-bullseye-slim

WORKDIR /app

# Copy over all the files in the project directory to /app early
# for rollup bundling
COPY . . 

ENV PORT=3000
ENV DB_URI=${ANONYMOUS_MESSAGE_BOARD_DB_URI}

RUN npm ci

CMD ["npm", "start"]
