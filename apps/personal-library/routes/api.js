/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DB;
const Mongoose = require("mongoose");
const BookModel = require("../db/BookModel").BookModel;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

Mongoose.connect(MONGODB_CONNECTION_STRING,  { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    console.error(err);
  }
});

module.exports = function (app) {
  app
    .route("/api/books")
    .get(async function (req, res) {
      const books = await BookModel.find();
      res.status(200).json(books);
    })

    .post(async function (req, res) {
      let title = req.body.title;
      if (!title) {
        res.status(200).send("missing required field title");
        return;
      }
      const data = await BookModel.create({
        title,
        comments: [],
        commentcount: 0,
      });
      res.status(200).json({ _id: data._id, title: data.title });
    })

    .delete(async function (req, res) {
      await BookModel.deleteMany({}, (err) => {
        if (err) {
          res.status(200).send("Error");
          return;
        }
        res.status(200).send("complete delete successful");
      });
    });

  app
    .route("/api/books/:id")
    .get(async function (req, res) {
      let bookid = req.params.id;
      if (!Mongoose.Types.ObjectId.isValid(bookid)) {
        res.status(200).send("no book exists");
        return;
      }
      const book = await BookModel.findOne({ _id: bookid });
      if (!book) {
        res.status(200).send("no book exists");
        return;
      }
      res.status(200).json(book);
    })

    .post(async function (req, res) {
      let bookid = req.params.id;
      if (!Mongoose.Types.ObjectId.isValid(bookid)) {
        res.status(200).send("no book exists");
        return;
      }
      let comment = req.body.comment;
      if (!comment) {
        res.status(200).send("missing required field comment");
        return;
      }
      const book = await BookModel.findById(bookid, (err) => {
        if (err) {
          return undefined;
        }
      });
      if (!book) {
        res.status(200).send("no book exists");
        return;
      }
      book.comments.push(comment);
      book.commentcount++;
      await book.save();
      res.status(200).json(book);
    })

    .delete(async function (req, res) {
      let bookid = req.params.id;
      if (!Mongoose.Types.ObjectId.isValid(bookid)) {
        res.status(200).send("no book exists");
        return;
      }
      const todelete = await BookModel.findOne({ _id: bookid });
      if (!todelete) {
        res.status(200).send("no book exists");
        return;
      }
      const deleted = await BookModel.deleteOne({ _id: bookid });
      res.status(200).send("delete successful");
    });
};
