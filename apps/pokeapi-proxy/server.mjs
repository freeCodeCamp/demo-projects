import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { router as pokemonRouter } from './api/pokemon/pokemon.routes.mjs';
const portNum = process.env.PORT || 3000;
const app = express();

// Serve static content and landing page
app.use(express.static('public'));

// CORS
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/status/ping', (req, res) => {
  res.send({ msg: 'pong' }).status(200);
});

// API routes
app.use('/api', pokemonRouter);

// Error handlers
const errorHandler = (err, req, res, next) => {
  // Check for Axios status codes and statusText, or other error messages,
  // otherwise set defaults
  err.statusCode = err?.response?.status || err.statusCode || 500;
  err.message =
    err?.response?.statusText || err.message || 'Internal server error';

  console.error(err.statusCode, err.message);
  res.status(err.statusCode).send(err.message);
};

const invalidPathHandler = (req, res, next) => {
  res.status(404).send('Invalid path');
};

app.use(errorHandler);
app.use(invalidPathHandler);

// Listen for requests
app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
});
