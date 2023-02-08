FROM node:16-bullseye-slim
WORKDIR /app
# Copy over all the files in the project directory to /app early
# for rollup bundling
COPY . . 
RUN npm ci
CMD ["npm", "start"]
