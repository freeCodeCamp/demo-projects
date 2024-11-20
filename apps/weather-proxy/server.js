require('dotenv').config();
var request = require('request');
var path = require('path');
var imgLinks = require('./data/imgLinks.json');
var cities = require('./data/cities.json');
var express = require('express');
var app = express();

var requestTimes = [];
var weatherAPI =
  'http://api.openweathermap.org/data/2.5/weather?units=metric&appid=' +
  process.env.OPEN_WEATHER_API_KEY;

function replaceIconsWithLinks(data) {
  for (var i = 0; i < data.weather.length; ++i) {
    if ('icon' in data.weather[0]) {
      data.weather[0].icon = imgLinks[data.weather[0].icon];
    }
  }
}

function getBestCachedData() {
  var fs = require('fs');
  var obj = JSON.parse(fs.readFileSync('./data/cache.json', 'utf8'));
  return obj;
}

function addToCache() {
  //For now does nothing. We aren't saving data.
}

function removeDatesOlderThan(milliseconds) {
  for (var i = 0; i < requestTimes.length; ++i) {
    if (Date.now() - requestTimes[i] > milliseconds) {
      requestTimes.splice(i, 1);
    }
  }
}

var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get('/status/ping', (req, res) => {
  res.send({ msg: 'pong' }).status(200);
});

app.use('/images', express.static('images'));

app.get('/api/city/:city', function (req, res) {
  const city = req.params.city.toLocaleLowerCase();

  if (cities[city]) {
    res.status(200).json(cities[city]);
  } else {
    res.status(404).json({
      error: `Weather information for city '${city}' not found.`
    });
  }
});

app.get('/api/current', function (req, res) {
  var longitude = req.query.lon;
  var latitude = req.query.lat;
  var callback = req.query.callback;
  if (!isNaN(longitude) && !isNaN(latitude)) {
    var url = weatherAPI + '&lon=' + longitude + '&lat=' + latitude;
    removeDatesOlderThan(60000);
    if (requestTimes.length < 60) {
      requestTimes.push(new Date());
      request(url, function (err, resAPI, body) {
        if (err) {
          console.log(err);
        }
        var data = JSON.parse(body);
        if (data.cod != 200) {
          var codError = data.cod;
          console.log('COD ERROR:' + codError);
          console.log('ERROR:' + err);
          console.log('RESPONSE ERROR:' + JSON.stringify(resAPI));
          console.log('BODY:' + body);
          console.log('DATA:' + JSON.stringify(data));
          console.log('REQUEST:' + req.body);
          console.log('REQUESTED URL:' + url);
        }
        if ('weather' in data) {
          addToCache(data);
        } else {
          data = getBestCachedData(longitude, latitude);
          console.log(data);
        }
        replaceIconsWithLinks(data);
        if (callback) {
          res.jsonp(data);
        } else {
          res.json(data);
        }
      });
    } else {
      var data = getBestCachedData(longitude, latitude);
      replaceIconsWithLinks(data);
      if (callback) {
        res.jsonp(data);
      } else {
        res.json(data);
      }
    }
  } else {
    res.json({
      error:
        'Please provide longitude as lon and latitude as lat as numbers/floats.'
    });
  }
});

const portNum = process.env.PORT || 3000;

//Start our server and tests!
app.listen(portNum, function () {
  console.log('Listening on port ' + portNum);
});
