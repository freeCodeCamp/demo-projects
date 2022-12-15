FROM node:16
WORKDIR /app
# Copy over all the files in the project directory to /app early
# for rollup bundling
COPY . . 
RUN cp sample.env .env && npm install
