require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const creatureRouter = require('./routes/api');

app.use(express.static('public'));
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/status/ping', (req, res) => {
  res.send({ msg: 'pong' }).status(200);
});

app.use('/api', creatureRouter);

const portNum = process.env.PORT || 3000;
app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
});
