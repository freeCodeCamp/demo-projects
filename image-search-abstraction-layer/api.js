var googleSearch = require('google-images');
var moment = require('moment');
var mongo = require('mongodb').MongoClient;

module.exports = function(app) {

  app.get('/', function(req,res) {
    console.log("Redirected to 'index.html'");
    return res.sendFile('public/index.html', { root: __dirname });
  });

  app.route('/recent').get(getRecent);
  app.get('/query/:searchQuery', getImages);

  function getImages(req, res) {
    var searchQuery = req.params.searchQuery;
    var pages = req.query.page;
    var sizes = req.query.size;
    var client = new googleSearch(process.env.CSEID, process.env.APIKEY);
    
    mongo.connect(process.env.MONGO_URI, function (err, db) {
      if (err) throw err;
      console.log('Connected to mongoDB');
      
      var collection = db.collection('searches');
      var time = new Date();
      time /= 1000;

      collection.insert({'searchQuery': searchQuery, 'timeSearched': moment.unix(time).format('MMMM Do YYYY, h:mm:ss a')});    
      db.close();
    });

    client.search(searchQuery, {size: sizes, page: pages}).then(images => {
      return res.json({images});
     });
  }

  function getRecent(req, res) {
    mongo.connect(process.env.MONGO_URI, function (err, db) {
      if (err) throw err;
      console.log('Connection Established');
      
      var collection = db.collection('searches');

      collection.find( {}, { _id:0 } ).toArray(function(err, result) {
        if(err) {
          return res.send(err);
        } else if (result.length) {
          return res.json(result);
        } else {
          return res.send('No Documents Found.');        
        }
      });

      db.close();
    });
  }
};
