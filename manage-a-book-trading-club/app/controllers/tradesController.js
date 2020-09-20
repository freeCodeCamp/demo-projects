'use strict';

// const Request = require('../models/Request');
// const Book = require('../models/Book');
const Trade = require('../models/Trade');

function index(req, res, next) {
  Trade.find({})
    .populate('requester accepter')
    .sort({ _id: -1 })
    .then((trades) => {
      res.render('trades/index', {
        trades,
        title: 'All Trades',
        user: req.user,
        active: 'trades',
        messages: req.flash('info'),
      });
    })
    .catch(next);
}

function create(req, res, next) {
  const { requester, gives, takes } = req.locals.request;

  Trade.create({
    // eslint-disable-next-line no-underscore-dangle
    accepter: req.user._id,
    requester,
    gives,
    takes,
  })
  .then((trade) => {
    if (!trade) next('Could not create trade');
    delete req.locals.request;
    req.flash('info', { success: 'Trade successfuly created' });
    res.redirect('/trades');
  })
  .catch(next);
}


module.exports = {
  index,
  create,
};

