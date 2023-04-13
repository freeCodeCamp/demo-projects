FROM node:18-bullseye-slim

WORKDIR /app

# Copy over all the files in the project directory to /app early
# for rollup bundling
COPY . . 

ENV PORT=3000
ENV DB_URI=${EXERCISE_TRACKER_DB_URI}

RUN npm ci

CMD ["npm", "start"]
