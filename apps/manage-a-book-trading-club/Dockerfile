FROM node:18-bullseye-slim

WORKDIR /app

# Copy over all the files in the project directory to /app early
# for rollup bundling
COPY . . 

ENV PORT=3000
ENV GITHUB_KEY=${MANAGE_A_BOOK_TRADING_CLUB_GITHUB_KEY}
ENV GITHUB_SECRET=${MANAGE_A_BOOK_TRADING_CLUB_GITHUB_SECRET}
ENV MONGO_URI=${MANAGE_A_BOOK_TRADING_CLUB_MONGO_URI}
ENV APP_URL=${MANAGE_A_BOOK_TRADING_CLUB_APP_URL}

RUN npm ci

CMD ["npm", "start"]
