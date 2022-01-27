const Mongoose = require("mongoose");

const BookSchema = new Mongoose.Schema({
  title: String,
  comments: Array,
  commentcount: Number,
});

const BookModel = Mongoose.model("book", BookSchema);

module.exports = {
  BookSchema,
  BookModel,
};
