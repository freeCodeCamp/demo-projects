require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.route('/').get((req, res) => {
  res.sendFile(`${process.cwd()}/views/index.html`);
});

app.route(['/api/timestamp/:date?', '/api/:date?']).get((req, res) => {
  let date = null;
  // parse the date string
  if (req.params.date !== undefined) {
    // check if it is a unix timestamp
    const unixTimestamp = parseInt(req.params.date * 1);
    if (isNaN(unixTimestamp)) {
      // it's not a unix timestamp string
      date = new Date(req.params.date);
    } else {
      // it is a timestamp
      date = new Date(unixTimestamp);
    }
  } else {
    // the date string parameter is empty.
    // create a new date based on current time
    date = new Date(Date.now());
  }

  // Initialize the response object, if Date is invalid
  // this one will be returned
  const response =
    date == 'Invalid Date'
      ? { error: 'Invalid Date' }
      : { unix: date.getTime(), utc: date.toUTCString() };

  res.json(response);
});

// 404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404).type('text').send('Not Found');
});

const portNum = process.env.PORT || 3000;

app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
});
