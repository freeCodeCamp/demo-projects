'use strict';

const dotenv = require('dotenv');

dotenv.config();

const app = require('./app/app');

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`server listening on port ${server.address().port}`);
});
