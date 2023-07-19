import 'dotenv/config';
import express from 'express';
import { router as pokemonRouter } from './api/pokemon/pokemon.routes.mjs';
const portNum = process.env.PORT || 3000;
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/api', pokemonRouter);

// Invalid path error handler
app.use((req, res, next) => {
  res.status(404).send('Invalid path');
});

// Global error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal server error';

  console.error(err.statusCode, err.message);
  res.status(err.statusCode).send(err.message);
});

// Listen for requests
app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
});
