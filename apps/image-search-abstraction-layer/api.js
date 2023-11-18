var googleSearch = require('google-images');
var moment = require('moment');

module.exports = function (app, db) {
  app.get('/', function (req, res) {
    console.log("Redirected to 'index.html'");
    return res.sendFile('public/index.html', { root: __dirname });
  });

  app.get('/status/ping', (req, res) => {
    res.status(200).send({ msg: 'pong' });
  });

  app.route('/recent').get(getRecent);
  app.get('/query/:searchQuery', getImages);

  function getImages(req, res) {
    var searchQuery = req.params.searchQuery;
    var pages = req.query.page;
    var sizes = req.query.size;
    var client = new googleSearch(process.env.CSEID, process.env.APIKEY);

    var collection = db.collection('searches');
    var time = new Date();
    time /= 1000;

    collection.insert({
      searchQuery: searchQuery,
      timeSearched: moment.unix(time).format('MMMM Do YYYY, h:mm:ss a')
    });

    client.search(searchQuery, { size: sizes, page: pages }).then(images => {
      return res.json({ images });
    });
  }

  function getRecent(_, res) {
    var collection = db.collection('searches');

    collection.find({}, { _id: 0 }).toArray(function (err, result) {
      if (err) return res.send(err);

      if (result.length) {
        return res.json(result);
      } else {
        return res.send('No Documents Found.');
      }
    });
  }
};
