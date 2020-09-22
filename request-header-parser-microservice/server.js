'use strict';

require('dotenv').config();
var express = require('express');
var cors = require('cors');

var app = express();

// allow Cross Origin requests, for testing
app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));

// get ip infos even if passing through a proxy like here
app.enable('trust proxy'); 

app.route('/')
  .get(function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.route('/api/whoami')
  .get(function(req, res){
    res.json({ipaddress: req.ip, language: req.headers['accept-language'], software: req.headers['user-agent']});
  });

// 404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
})


const portNum = process.env.PORT || 3000;

//Start our server and tests!
app.listen(portNum, function () {
  console.log("Listening on port " + portNum);
});
