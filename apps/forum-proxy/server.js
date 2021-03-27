require('dotenv').config();
const cors = require('cors');
const fetch = require('node-fetch');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
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

app.use((err, req, res, next) => res.status(500).json(err));

const portNum = process.env.PORT || 3000;

const listener = app.listen(portNum, function() {
  console.log(`Your app is listening on port ${portNum}`);
});
