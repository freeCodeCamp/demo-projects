/*
*
*
*       FILL IN EACH ROUTE BELOW COMPLETELY
*       
*       
*/

'use strict';

const expect = require('chai').expect;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DB_URI;

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      MongoClient.connect(MONGODB_CONNECTION_STRING, { useUnifiedTopology: true }, (err, client) => {
        expect(err, 'database error').to.not.exist;
        const db = client.db('personal-library-v0');
        const collection = db.collection('books');
        collection.find().toArray(function(err, result) {
          expect(err, 'database find error').to.not.exist;
          expect(result).to.exist;
          expect(result).to.be.a('array');
          for(var i=0;i<result.length;i++) {
            result[i].commentcount = result[i].comments.length;
            delete result[i].comments;
          }
          res.json(result);
        });
      });
    })
    .post(function (req, res){
      var title = req.body.title;
      if(!title) {
        res.send('missing title');
      } else {
        expect(title, 'posted title').to.be.a('string');
         MongoClient.connect(MONGODB_CONNECTION_STRING, { useUnifiedTopology: true }, (err, client) => {
          expect(err, 'database error').to.not.exist;
          const db = client.db('personal-library-v0');
          const collection = db.collection('books');
          var doc = { title: title, comments: [] };
          collection.findOne({ title: doc.title }, (err, result) => {
            expect(err, 'database insert error').to.not.exist;
            // Exit if title already exists in library
            if (result) return res.send('title already exists');

            collection.insertOne(doc, (err, result) => {
              res.json(result.ops[0]);
            });
          }); 
        });
      }
    })
    .delete(function(req, res){
      MongoClient.connect(MONGODB_CONNECTION_STRING, { useUnifiedTopology: true }, (err, client) => {
        expect(err, 'database error').to.not.exist;
        const db = client.db('personal-library-v0');
        const collection = db.collection('books');
        collection.deleteMany({});
        res.send("complete delete successful");
      });
    });
    
  app.route('/api/books/:id')
    .get(function (req, res){
      var bookid = req.params.id;
      //expect(bookid).to.have.lengthOf(24);
      var oid = new ObjectId(bookid); //Must convert to mongo object id to search by it in db
      MongoClient.connect(MONGODB_CONNECTION_STRING, { useUnifiedTopology: true }, (err, client) => {
        expect(err, 'database error').to.not.exist;
        const db = client.db('personal-library-v0');
        const collection = db.collection('books');
        collection.find({_id:oid}).toArray(function(err, result) {
          expect(err, 'database find error').to.not.exist;
          if(result.length === 0) {
            res.send('no book exists');
          } else {
            res.json(result[0]);
          }
        });
      });
      //format: {"bookid": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    .post(function(req, res){
      var bookid = req.params.id;
      var oid = new ObjectId(bookid); //Must convert to mongo object id to search by it in db
      var comment = req.body.comment;
    
      // Exit early if there is no comment
      if (!comment) return res.send('missing comment');
    
      MongoClient.connect(MONGODB_CONNECTION_STRING, { useUnifiedTopology: true }, (err, client) => {
        expect(err, 'database error').to.not.exist;
        const db = client.db('personal-library-v0');
        const collection = db.collection('books');
        collection.findOneAndUpdate(
          {_id: oid},
          {$push: { comments: comment }},
          { returnOriginal: false },
          function(err, result){
            expect(err, 'database findAndModify error').to.not.exist;
            res.json(result.value);
          });
      });
    })
    .delete(function(req, res){
      var bookid = req.params.id;
      var oid = new ObjectId(bookid); //Must convert to mongo object id to search by it in db
      MongoClient.connect(MONGODB_CONNECTION_STRING, { useUnifiedTopology: true }, (err, client) => {
        expect(err, 'database error').to.not.exist;
        const db = client.db('personal-library-v0');
        const collection = db.collection('books');
        collection.findOneAndDelete({_id:oid}, function(err, result) {
          expect(err, 'database findOneAndDelete error').to.not.exist;
          expect(result, 'result error').to.exist;
          res.send("delete successful");
        });
      });
    });
  
};
