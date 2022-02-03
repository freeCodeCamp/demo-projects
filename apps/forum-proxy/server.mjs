import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import 'dotenv/config';
import cors from 'cors';
import fetch from 'node-fetch';
import express from 'express';

const app = express();

const __dirname = dirname(fileURLToPath(new URL(import.meta.url)));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, './views/index.html'));
})

app.use(cors({optionsSuccessStatus: 200}));
app.get('/latest', (req, res, next) => {
  fetch('https://forum.freecodecamp.org/latest.json')
    .then(response => response.json())
    .then(data => {
      res.json(data);
    })
    .catch(err => next(err));
});

app.use((req, res) => res.status(404).send('not found'));

app.use((err, req, res) => res.status(500).json(err));

const portNum = process.env.PORT || 3000;

app.listen(portNum, function() {
  console.log(`Your app is listening on port ${portNum}`);
});

export default app;