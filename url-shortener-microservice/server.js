require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bodyParser = require('body-parser');

const urlHandler = require('./controllers/urlHandler.js');

const app = express();

const mongoURL = process.env.DB_URI;

mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(mongoURL, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({'extended': false}));
app.use(require('body-parser').json());
app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl/new', urlHandler.addUrl);
  
app.get('/api/shorturl/:shurl', urlHandler.processShortUrl);


// Answer not found to all the wrong routes
app.use((req, res, next) => {
  res.status(404);
  res.type('txt').send('Not found');
});

const portNum = process.env.PORT || 3000;

app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
});

module.exports = app; // For testing
