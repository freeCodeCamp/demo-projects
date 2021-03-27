var mongo = require('mongodb').MongoClient;
var express = require('express');
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID;

require('dotenv').config()

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

mongo.connect(process.env.MONGO_URI, function(err, db) {
  console.log('Successfully connected to MongoDB');

  app.locals.user = null;
  app.locals.usersPolls = null;
  app.locals.allPolls = null;
  app.locals.singlePoll = null;
  var users = db.collection('users');
  var polls = db.collection('polls');

  function login(req, res) {
    users.findOne({ 'username': req.body.username, 'password': req.body.password },{ _id: 0 }, function (err, findUser) {
      if (findUser) {
        app.locals.user = findUser.username;
        polls.find().toArray(function(err, findAllPolls) {
          app.locals.allPolls = findAllPolls;
          return mypolls(req, res);
        });
      } else {
        return allpolls(req, res);
      }
     });
  }

  function mypolls(req, res) {
    polls.find({ 'creator': app.locals.user },{ creator: 0 }).toArray(function(err, findUsersPolls) {
      app.locals.usersPolls = findUsersPolls;
      return res.render('mypolls');
    });
  }

  function allpolls(req, res) {
    polls.find().toArray(function(err, findAllPolls) {
      app.locals.allPolls = findAllPolls;
      return res.render('index');
    });
  }

  app.get('/', allpolls)
  
  app.get('/signup', function(req, res){
     return res.render('signup');
  });
  
  app.post('/signup', function(req, res){
    users.findOne({ 'username': req.body.username }, function (err, signup) {
      if (!signup) {
        users.insert({'username': req.body.username, 'password': req.body.password });
        return login(req, res);
      } else {
        return login(req, res);
      }      
    });
  });
  
  app.get('/login', function(req, res){
    return res.render('login');
  });
   
  app.post('/login', login)
    
  app.get('/mypolls', mypolls);
  
  app.get('/newpoll', function(req, res){
    return res.render('newpoll');
  });
  
  app.post('/newpoll', function(req, res){
    var optionArray = req.body.newoptions.split(',');
    var options = {};
    
    for (var i=0; i<optionArray.length; i++) {
      options[optionArray[i]] = 0;
    }
    
    polls.insert({ 'creator':app.locals.user, 'question': req.body.newquestion, 'options': options }, function(err, result) {
      return mypolls(req, res);    
    });
  });

  app.post('/vote/:id', function(req, res){  
    if (req.body.voteOptions === "Add option") {
      polls.update({ _id : ObjectID(req.params.id)}, { $inc: { ["options."+req.body.newOption] : 1 } }, { upsert: true });
      return allpolls(req, res);
    } else {    
      polls.update({ _id : ObjectID(req.params.id)}, { $inc: { ["options."+req.body.voteOptions] : 1 } }, { upsert: true });
      return allpolls(req, res);
    }
  });
  
  app.get('/delete/:id', function(req, res){
    polls.remove({ _id : ObjectID(req.params.id)}, function(err, result) {  
      return mypolls(req, res);
    });
  });
  
  app.get('/share/:id', function(req, res){
    polls.find({ '_id' : ObjectID(req.params.id)}).toArray(function(err, findSinglePoll) {
      app.locals.singlePoll = findSinglePoll[0];  
      return res.render('singlepoll');
    });
  });
  
  app.get('/logout', function(req, res){
    app.locals.user = null;
    return allpolls(req, res);
  });
  
});

const portNum = process.env.PORT || 3000;

app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
});
