'use strict';

const mongoose = require('mongoose');
const Request = require('../models/Request');
const Book = require('../models/Book');
const User = require('../models/User');
const Trade = require('../models/Trade');
const booksHelpers = require('../helpers/books');
const usersHelpers = require('../helpers/users');

function populateRequest(query) {
  return query
    .populate({
      path: 'gives',
      populate: {
        path: 'owner',
        model: 'User',
      },
    })
    .populate({
      path: 'takes',
      populate: {
        path: 'owner',
        model: 'User',
      },
    })
    .populate('requester');
}

function findRequest(id) {
  return populateRequest(Request.findById(id));
}

function findRequests(where) {
  return populateRequest(Request.find(where))
    .sort({ _id: -1 });
}

function filterMyBooksRequest(request, userId) {
  const myBooks = request.takes.filter(book => book.owner.id === userId);
  const { requester, gives, _id } = request;
  return { requester, gives, _id, takes: myBooks };
}

function filterMyBooksRequests(requests, userId) {
  return requests.map(request => filterMyBooksRequest(request, userId));
}

/*
 * create request
 * push request to request.takes book.requests
 * push request to request.takes book.owners User.receivedRequests
 */
function createRequest(request) {
  return Request.create(request)
    .then((created) => {
      console.log(created);
      return booksHelpers.handleCreatedRequest(created)
        .then(() => usersHelpers.handleCreatedRequest(created));
    });
}

/*
 *   - remove request
 *   - pull request from all request.takes Book.requests
 *   - pull request from all receiver's User.receivedRequests
 */
function deleteRequest(request) {
  return request.remove()
    .then(() => Book.update(
        { requests: request._id },
        { $pull: { requests: request._id } },
        { multi: true }))
    .then(() => User.update(
        { receivedRequests: request._id },
        { $pull: { receivedRequests: request._id } },
        { multi: true }));
}

function deleteRequests(requests) {
  const requestsIds = requests.map(request => request._id);
  return Request.remove({ _id: { $in: requestsIds } })
    .then(() => Book.update(
      { requests: { $in: requestsIds } },
      { $pullAll: { requests: requestsIds } },
      { multi: true }))
    .then(() => User.update(
      { receivedRequests: { $in: requestsIds } },
      { $pullAll: { receivedRequests: requestsIds } },
      { multi: true }));
}

function handleInvalidRequests() {
  return Request.find({ $or: [{ takes: [] }, { gives: [] }] })
    .then(deleteRequests);
}
/*
 * pull the book from all Request.gives
 * pull the book from all Request.takes
 * hanlde invalid requests
 */
function handleDeletedBook(bookId) {
  return Request.update(
      { $or: [{ gives: bookId }, { takes: bookId }] },
      { $pull: { gives: bookId, takes: bookId } },
      { multi: true })
    .then(() => handleInvalidRequests());
}

function index(req, res, next) {
  findRequests({})
  .then((requests) => {
    res.render('requests/index', {
      requests,
      title: 'All Requests',
      user: req.user,
      active: 'requests',
      messages: req.flash('info'),
    });
  })
  .catch(next);
}

/* A receivedRequest may be removed if:
 *  - the requester cancels
 *  - the request becomes invalid:
 *    - the requester accepts some other request making the gives empty
 *    - the requester deletes some books making the gives empty
 *    - the receiver deletes some books making the takes empty
 *    - the receiver accept some other request making the takes empty
 *  - the receiver rejects the request
 *  - the reciever accepts the request making either the gives or takes empty
 */
function incomingRequests(req, res, next) {
  findRequests({ _id: { $in: req.user.receivedRequests } })
  .then((requests) => {
    const myBooksRequests = filterMyBooksRequests(requests, req.user.id);
    res.render('requests/index', {
      requests: myBooksRequests,
      title: 'Incoming Requests',
      subtitle: `for ${req.user.username}`,
      user: req.user,
      active: 'incoming',
      messages: req.flash('info'),
    });
  })
  .catch(next);
}

function selectBooks(req, res, next) {
  const requestKey = `request${req.params.id}`;
  const selectedGives = (req.session[requestKey] || {}).gives || [];
  const selectedTakes = (req.session[requestKey] || {}).takes || [];
  findRequest(req.params.id)
    .then((request) => {
      const myBooksRequest = filterMyBooksRequest(request, req.user.id);
      res.render('requests/select-books', {
        request: myBooksRequest,
        title: 'Select Books to Trade',
        user: req.user,
        messages: req.flash('info'),
        selectedGives,
        selectedTakes,
      });
    })
    .catch(next);
}

function handleRequestsNoLongerForUser(user) {
  return Request.find({ _id: { $in: user.receivedRequests } })
    .populate('takes')
    .then((requests) => {
      const notForUserRequests = requests.filter(request =>
        !request.takes.map(book => book.owner.toString()).includes(user._id.toString()));
      return user.update({ $pullAll: { receivedRequests: notForUserRequests } });
    });
}

/*
 * Request: remove the traded books from the request
 * Book: remove traded books from books collection
 * Trade: create a trade with the traded books
 * User: remove traded books from user's books
 * if request is invalid:
 *  - Book: remove request from all book's requests
 *  - Request: remove request from Request collection
 *  - User: remove request from user's receivedRequests
 * if the request is still valid and the request has no takes where owner is accepter
 *  - User: remove the request from the accepter's receivedRequests
 */
function acceptRequest(req, res, next) {
  const accepter = req.user._id;
  const { gives, takes } = res.locals;
  return findRequest(req.params.id)
    .then((request) => {
      if (!request) {
        req.flash('info', { warning: 'Could not find that request, perhaps the requester cancelled it' });
        return res.redirect('/requests/incoming');
      }
      const trade = { accepter, requester: request.requester._id };
      trade.gives = request.gives.filter(book => gives.includes(book._id.toString()))
        .map(book => ({ name: book.name, description: book.description }));
      trade.takes = request.takes.filter(book => takes.includes(book._id.toString()))
        .map(book => ({ name: book.name, description: book.description }));
      const givesObjectIds = gives.map(string => mongoose.Types.ObjectId(string));
      const takesObjectIds = takes.map(string => mongoose.Types.ObjectId(string));
      const tradedBooksIds = givesObjectIds.concat(takesObjectIds);
      return Trade.create(trade)
        .then(() => Book.deleteMany({ _id: { $in: gives.concat(takes) } }))
        .then((result) => {
          console.log('<<<<<<<<<<<<<< Deleted books: %s >>>>>>>>>>>>', JSON.stringify(result, null, 2));
          return User.update(
            { books: { $in: gives.concat(takes) } },
            { $pullAll: { books: givesObjectIds.concat(takesObjectIds) } },
            { multi: true });
        })
        .then(() => {
          console.log(givesObjectIds, takesObjectIds);
          return Request.update(
            { $or: [{ gives: { $in: tradedBooksIds } }, { takes: { $in: tradedBooksIds } }] },
            { $pullAll: { gives: tradedBooksIds, takes: tradedBooksIds } },
            { multi: true });
        })
        .then(handleInvalidRequests)
        .then(() => handleRequestsNoLongerForUser(req.user))
        .catch(next)
        .then(() => {
          req.flash('info', { success: 'Trade successful' });
          res.redirect('/requests/incoming');
        });
    });
}

/*
 *  Reject request:
 *  - remove request from user's receivedRequests
 *  - remove user's books from request.takes
 *  - if request.takes becomes empty:
 *     - remove request
 *  - remove request from user's book.requests
 */
function rejectRequest(req, res, next) {
  const requestId = new mongoose.Types.ObjectId(req.params.id);
  User
    .findByIdAndUpdate(req.user._id, {
      $pull: { receivedRequests: requestId },
    })
    .then(() => Book.update(
      { owner: req.user._id, requests: requestId },
      { $pull: { requests: requestId } },
      { multi: true }))
    .then(() => Request.findById(requestId).populate('takes'))
    .then((request) => {
      const myBooks = request.takes.filter(book => book.owner.toString() === req.user.id);
      return Request.update(
        { _id: requestId },
        { $pullAll: { takes: myBooks } });
    })
    .then(() => Request.remove({ takes: [] }))
    .catch(next)
    .then(() => {
      req.flash('info', { info: 'Trade request rejected' });
      res.redirect('/requests/incoming');
    });
}

/*
 * Home base for creating a request
 *  - goto edit list of books to give
 *  - goto edit list of books to take
 *  - submit the lists to create the request
 */
function newRequest(req, res) {
  // gives and takes are stored in the session
  const gives = (req.session.gives || []);
  const takes = req.session.takes || [];
  res.render('requests/new', {
    title: 'New Request',
    user: req.user,
    gives,
    takes,
    messages: req.flash('info'),
  });
}

function ensureRequestIsValid(req, res, next) {
  let invalid;
  res.locals.gives = (JSON.parse(req.body.gives) || []).sort();
  res.locals.takes = (JSON.parse(req.body.takes) || []).sort();

  if (!res.locals.gives.length) {
    invalid = true;
    req.flash('info', { warning: 'Request must include at least one book to give' });
  }
  if (!res.locals.takes.length) {
    invalid = true;
    req.flash('info', { warning: 'Request must include at least one book to take' });
  }
  if (invalid) return res.redirect('/requests/new');
  req.session.gives = [];
  req.session.takes = [];
  return next();
}

/*
 * Called with gives and takes in res.locals
 */
function addRequest(req, res, next) {
  const request = {
    // eslint-disable-next-line no-underscore-dangle
    requester: req.user._id,
    gives: res.locals.gives,
    takes: res.locals.takes,
  };
  createRequest(request)
    .then(() => {
      req.flash('info', { success: 'Request successfuly created' });
      res.redirect('/requests');
    })
    .catch(next);
}

function ensureOwnRequest(requestId, user) {
  return Request.findById(requestId)
    .then((request) => {
      if (request.requester.toString() !== user) {
        return Promise.reject({ notOwnRequest: true });
      }
      return Promise.resolve(request);
    });
}

function cancelRequest(req, res, next) {
  ensureOwnRequest(req.params.id, req.user.id)
    .then(request => deleteRequest(request))
    .then(() => {
      req.flash('info', { success: 'Request cancelled' });
      return res.redirect('/requests');
    })
    .catch((err) => {
      if (err.notOwnRequest) {
        req.flash('info', { danger: 'Not authorized to delete that request' });
        return res.redirect('/requests');
      }
      throw err;
    })
    .catch(next);
}

module.exports = {
  index,
  newRequest,
  ensureRequestIsValid,
  addRequest,
  cancelRequest,
  incomingRequests,
  selectBooks,
  acceptRequest,
  rejectRequest,
  handleDeletedBook,
};
