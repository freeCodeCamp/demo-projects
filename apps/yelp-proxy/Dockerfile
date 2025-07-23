FROM node:18-bullseye-slim

WORKDIR /app

# Copy over all the files in the project directory to /app early
# for rollup bundling
COPY . . 

ENV PORT=3000

RUN npm cigit 

CMD ["npm", "start"]
