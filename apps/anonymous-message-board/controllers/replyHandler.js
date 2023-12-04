const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const CONNECTION_STRING = process.env.DB_URI;
const sanitizeHtml = require('sanitize-html');

function ReplyHandler() {
  this.replyList = function (req, res) {
    const board = req.params.board;
    MongoClient.connect(
      CONNECTION_STRING,
      { useUnifiedTopology: true },
      (err, client) => {
        const db = client.db('anonymous-message-board-v0');
        const collection = db.collection(board);
        collection
          .find(
            { _id: new ObjectId(req.query.thread_id) },
            {
              projection: {
                reported: 0,
                delete_password: 0,
                'replies.delete_password': 0,
                'replies.reported': 0
              }
            }
          )
          .toArray((err, doc) => {
            res.json(doc[0]);
          });
      }
    );
  };

  this.newReply = function (req, res) {
    const board = req.params.board;
    const now = new Date();
    const reply = {
      _id: new ObjectId(),
      text: sanitizeHtml(req.body.text),
      created_on: now,
      reported: false,
      delete_password: req.body.delete_password
    };
    MongoClient.connect(
      CONNECTION_STRING,
      { useUnifiedTopology: true },
      (err, client) => {
        const db = client.db('anonymous-message-board-v0');
        const collection = db.collection(board);
        collection.findOneAndUpdate(
          { _id: new ObjectId(req.body.thread_id) },
          {
            $set: { bumped_on: now },
            $push: { replies: reply }
          },
          () => {}
        );
      }
    );
    res.redirect('/b/' + board + '/' + req.body.thread_id);
  };

  this.reportReply = function (req, res) {
    const board = req.params.board;
    MongoClient.connect(
      CONNECTION_STRING,
      { useUnifiedTopology: true },
      (err, client) => {
        const db = client.db('anonymous-message-board-v0');
        const collection = db.collection(board);
        collection.findOneAndUpdate(
          {
            _id: new ObjectId(req.body.thread_id),
            'replies._id': new ObjectId(req.body.reply_id)
          },
          { $set: { 'replies.$.reported': true } },
          () => {}
        );
      }
    );
    res.send('reported');
  };

  this.deleteReply = function (req, res) {
    const board = req.params.board;
    MongoClient.connect(
      CONNECTION_STRING,
      { useUnifiedTopology: true },
      (err, client) => {
        const db = client.db('anonymous-message-board-v0');
        const collection = db.collection(board);
        collection.findOneAndUpdate(
          {
            _id: new ObjectId(req.body.thread_id),
            replies: {
              $elemMatch: {
                _id: new ObjectId(req.body.reply_id),
                delete_password: req.body.delete_password
              }
            }
          },
          { $set: { 'replies.$.text': '[deleted]' } },
          (err, doc) => {
            if (doc.value === null) {
              res.send('incorrect password');
            } else {
              res.send('success');
            }
          }
        );
      }
    );
  };
}

module.exports = ReplyHandler;
