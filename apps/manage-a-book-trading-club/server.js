'use strict';

const dotenv = require('dotenv');

dotenv.config();

const app = require('./app/app');

const portNum = process.env.PORT || 3000;

app.listen(portNum, () => {
  console.log(`server listening on port ${portNum}`);
});
