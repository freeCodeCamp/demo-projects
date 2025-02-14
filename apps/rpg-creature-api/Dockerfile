FROM node:18-bullseye-slim

WORKDIR /app

COPY . .

ENV PORT=3000

RUN npm ci

CMD ["npm", "start"]
