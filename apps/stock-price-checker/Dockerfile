FROM node:16
WORKDIR /app
COPY package*.json ./
COPY sample.env ./.env
RUN npm install
COPY . .
