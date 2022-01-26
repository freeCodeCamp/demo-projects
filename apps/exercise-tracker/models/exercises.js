const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Exercises = new Schema({
  description: {
    type: String,
    required: true,
    maxlength: [20, 'description too long']
  },
  duration: {
    type: Number,
    required: true,
    min: [1, 'duration too short']
  },
  date: {
    type: Date,
    default: Date.now
  },
  username: String,
  userId: {
    type: String,
    ref: 'Users',
    index: true
  }
});

// add current date to the exercise instance if necessary
Exercises.pre('save', function(next) {
  if (!this.date) {
    this.date = Date.now();
  }

  next();
});

module.exports = mongoose.model('Exercises', Exercises);
