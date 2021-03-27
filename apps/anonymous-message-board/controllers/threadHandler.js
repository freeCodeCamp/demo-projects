const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const CONNECTION_STRING = process.env.DB_URI;

function ThreadHandler() {

  this.threadList = function(req, res) {
    const board = req.params.board;
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true }, (err, client) => {
      const db = client.db('anonymous-message-board-v0');
      const collection = db.collection(board);
      collection.find(
        {},
        {
          reported: 0,
          delete_password: 0,
          "replies.delete_password": 0,
          "replies.reported": 0
        })
      .sort({bumped_on: -1})
      .limit(10)
      .toArray((err, docs) => {
        docs.forEach((doc) => {
          doc.replycount = doc.replies.length;
          if(doc.replies.length > 3) {
            doc.replies = doc.replies.slice(-3);
          }
        });
        res.json(docs);
      });
    });
  };
  
  this.newThread = function(req, res) {
    const board = req.params.board;
    const thread = {
      text: req.body.text,
      created_on: new Date(),
      bumped_on: new Date(),
      reported: false,
      delete_password: req.body.delete_password,
      replies: []
    };
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true }, (err, client) => {
      const db = client.db('anonymous-message-board-v0');
      const collection = db.collection(board);
      collection.insertOne(thread, function(){
        res.redirect('/b/' + board + '/');
      });
    });
  };
  
  //reported_id name
  this.reportThread = function(req, res) {
    const board = req.params.board;
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true }, (err, client) => {
      const db = client.db('anonymous-message-board-v0');
      const collection = db.collection(board);
      collection.findOneAndUpdate(
        {_id: new ObjectId(req.body.report_id)},
        {$set: {reported: true}},
        (err, doc) => {});
    });
    res.send('reported');
  };
  
  //check doc return to return right res
  this.deleteThread = function(req, res) {
    const board = req.params.board;
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true }, (err, client) => {
      const db = client.db('anonymous-message-board-v0');
      const collection = db.collection(board);
      collection.findOneAndDelete(
        {
          _id: new ObjectId(req.body.thread_id),
          delete_password: req.body.delete_password
        },
        (err, doc) => {
          if (doc.value === null) {
            res.send('incorrect password');
          } else {
            res.send('success');
          }
        });
        
    });
  };
  
}

module.exports = ThreadHandler;
