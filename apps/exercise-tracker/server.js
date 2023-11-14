require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');

mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB_URI || 'mongodb://localhost/exercise-track', {
  useNewUrlParser: true
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/status/ping', (req, res) => {
  res.status(200).send({ msg: 'pong' });
});

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

// Not found middleware
app.use((req, res, next) => {
  return next({ status: 404, message: 'not found' });
});

// Error Handling middleware
app.use((err, req, res) => {
  let errCode, errMessage;

  if (err.errors) {
    // Mongoose validation error
    errCode = 400; // Bad request
    const keys = Object.keys(err.errors);
    // Report the first validation error
    errMessage = err.errors[keys[0]].message;
  } else {
    // Generic or custom error
    errCode = err.status || 500;
    errMessage = err.message || 'Internal Server Error';
  }
  res.status(errCode).type('txt').send(errMessage);
});

const portNum = process.env.PORT || 3000;

// Listen for requests
app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
});

module.exports = app; // For testing
