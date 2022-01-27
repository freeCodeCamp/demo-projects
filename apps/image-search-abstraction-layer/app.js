var express = require('express');
require('dotenv').config();

var app = express();

app.use(express.static('public'));
  
require('./api.js')(app);

var portNum = process.env.PORT || 3000;

app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
});