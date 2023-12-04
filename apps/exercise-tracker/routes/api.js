const Users = require('../models/users');
const Exercises = require('../models/exercises');

const router = require('express').Router();

router.get('/users', (req, res) => {
  Users.find({}, (err, data) => {
    res.json(data);
  });
});

router.post('/users', (req, res, next) => {
  const user = new Users(req.body);
  user.save((err, savedUser) => {
    if (err) {
      if (err.code == 11000) {
        // uniqueness error (no custom message)
        return next({
          status: 400,
          message: 'Username already taken'
        });
      } else {
        return next(err);
      }
    }

    res.json({
      username: savedUser.username,
      _id: savedUser._id
    });
  });
});

router.post('/users/:userId/exercises', (req, res, next) => {
  const userId = req.url.split('/')[2];

  Users.findById(userId, (err, user) => {
    if (err) return next(err);
    if (!user) {
      return next({
        status: 400,
        message: 'Unknown userId'
      });
    }

    const exercise = new Exercises({ ...req.body, userId });
    exercise.username = user.username;
    exercise.save((err, savedExercise) => {
      if (err) return next(err);
      savedExercise = savedExercise.toObject();

      // append exercise values to
      // cloned user object and return
      const userObjWithExercises = {
        ...user.toObject(),
        date: new Date(savedExercise.date).toDateString(),
        duration: savedExercise.duration,
        description: savedExercise.description
      };

      delete userObjWithExercises.__v;

      res.json(userObjWithExercises);
    });
  });
});

router.get('/users/:userId/logs', (req, res, next) => {
  const userId = req.url.split('/')[2];
  const from = new Date(req.query.from);
  const to = new Date(req.query.to);

  Users.findById(userId, (err, user) => {
    if (err) return next(err);
    if (!user) {
      return next({ status: 400, message: 'Unknown userId' });
    }

    Exercises.find(
      {
        userId: userId,
        date: {
          $lte: to != 'Invalid Date' ? to.toISOString() : Date.now(),
          $gte: from != 'Invalid Date' ? from.toISOString() : 0
        }
      },
      {
        __v: 0,
        _id: 0
      }
    )
      .sort('-date')
      .limit(parseInt(req.query.limit))
      .exec((err, exercises) => {
        if (err) return next(err);
        const out = {
          _id: userId,
          username: user.username,
          from: from != 'Invalid Date' ? from.toDateString() : undefined,
          to: to != 'Invalid Date' ? to.toDateString() : undefined,
          count: exercises.length,
          log: exercises.map(e => ({
            description: e.description,
            duration: e.duration,
            date: e.date.toDateString()
          }))
        };
        res.json(out);
      });
  });
});

module.exports = router;
