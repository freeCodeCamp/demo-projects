FROM node:26-bookworm-slim

WORKDIR /app

RUN npm install --global npm@12.2.2

# Copy over all the files in the project directory to /app early
# for rollup bundling
COPY . . 

ENV PORT=3000
ENV MONGO_URI=${IMAGE_SEARCH_ABSTRACTION_LAYER_MONGO_URI}
ENV CSEID=${IMAGE_SEARCH_ABSTRACTION_LAYER_CSEID}
ENV APIKEY=${IMAGE_SEARCH_ABSTRACTION_LAYER_APIKEY}

RUN npm ci

CMD ["npm", "start"]
