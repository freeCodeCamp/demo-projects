'use strict';

const Book = require('../models/Book');
const User = require('../models/User');
const requestsController = require('./requestsController');

const booksController = (function booksController() {
  function findBookById(id) {
    return Book
      .findById(id)
      .select('name description owner requests')
      .populate({
        path: 'requests',
        populate: {
          path: 'requester',
          model: 'User',
        },
      })
      .populate({
        path: 'requests',
        populate: {
          path: 'gives',
          model: 'Book',
          populate: {
            path: 'owner',
            model: 'User',
          },
        },
      })
      .populate({
        path: 'requests',
        populate: {
          path: 'takes',
          model: 'Book',
          populate: {
            path: 'owner',
            model: 'User',
          },
        },
      })
      .populate('owner');
  }

  function findBooks(where) {
    return Book
      .find(where)
      .select('name description owner requests')
      .sort({ _id: -1 })
      .populate({
        path: 'requests',
        populate: {
          path: 'requester',
          model: 'User',
        },
      })
      .populate({
        path: 'requests',
        populate: {
          path: 'takes',
          model: 'Book',
        },
      })
      .populate('owner');
  }

  function index(req, res, next) {
    findBooks({})
      .then((books) => {
        res.render('books/index', {
          books,
          title: 'Books',
          user: req.user,
          noItems: 'There are currently no books',
          active: 'books',
          messages: req.flash('info'),
        });
      })
      .catch(next);
  }

  function myIndex(req, res, next) {
    findBooks({ owner: req.user.id })
      .then((books) => {
        res.render('books/my-books', {
          books,
          title: 'My Books',
          user: req.user,
          noItems: 'You currently have no books',
          active: 'mybooks',
          messages: req.flash('info'),
        });
      })
      .catch(next);
  }

  /*
   * create book
   * push book to book.owner's User.books
   */
  function createBook(book) {
    return Book.create(book)
      .then(created => User.findOneAndUpdate(
          { _id: created.owner },
          { $push: { books: created._id } }));
  }

  function addBook(req, res, next) {
    const book = {
      name: req.body.bookName,
      description: req.body.bookDescription,
      owner: req.user._id,
    };
    createBook(book)
      .then(() => {
        req.flash('info', { success: 'Added book successfuly' });
        res.redirect('/books/my');
      })
      .catch(next);
  }

  function ensureIsBookOwner(bookId, userId) {
    return Book.findById(bookId)
      .then((book) => {
        if (book.owner.toString() !== userId) {
          return Promise.reject({ notOwnBook: true });
        }
        return Promise.resolve(book);
      });
  }

  function deleteBook(book) {
    return book.remove()
      .then(() =>
        // remove the book from the owner's [books]
        User.findOneAndUpdate(
          { _id: book.owner },
          { $pull: { books: book._id } }))
      .then(() => requestsController.handleDeletedBook(book._id));
  }

 /*
   * When a book is deleted:
   *  - remove book from Books collection
   *  - remove book from the owner's User.books
   *  - remove book from any Request.gives and Request.takes
   * Then find requests that are invalid (empty gives or takes)
   *  - remove invalid from Requests collection
   *  - remove invalid from Book.requests
   *  - remove invalid from User.receivedRequests
   */
  function removeBook(req, res, next) {
    ensureIsBookOwner(req.params.id, req.user.id)
      .catch((err) => {
        if (err.notOwnBook) {
          req.flash('info', { danger: 'Not authorized to delete that book' });
          return res.redirect('/books');
        }
        throw err;
      })
      .then(deleteBook)
      .catch(next)
      .then(() => {
        req.flash('info', { success: 'Book deleted successfuly' });
        return res.redirect('/books/my');
      });
  }

  /*
   * Collects
   *  - all requests having takes including the req.param.book
   * Renders
   *  - list of requests for the specified book
   */
  function bookRequests(req, res, next) {
    findBookById(req.params.id)
      .then(book =>
        res.render('requests/index', {
          title: `Requests for ${book.name}`,
          user: req.user,
          requestedBook: book,
          requests: book.requests,
          messages: req.flash('info'),
        }))
      .catch(next);
  }

  /*
   * Collect the req.user's books
   */
  function selectGives(req, res, next) {
    findBooks({ owner: req.user })
      .then((books) => {
        // eslint-disable-next-line no-underscore-dangle
        const selected = (req.session.gives || []).map(book => book._id);
        res.render('books/selectBooks', {
          selected,
          books,
          title: 'Select Books to Give',
          user: req.user,
          type: 'gives',
          noItems: 'You currently have no books',
          messages: req.flash('info'),
        });
      })
      .catch(next);
  }

  function selectTakes(req, res, next) {
    findBooks({ owner: { $ne: req.user } })
      .then((books) => {
        // eslint-disable-next-line no-underscore-dangle
        const selected = (req.session.takes || []).map(book => book._id);
        res.render('books/selectBooks', {
          selected,
          books,
          title: 'Select Books to Take',
          user: req.user,
          type: 'takes',
          noItems: 'There are currently no books',
          messages: req.flash('info'),
        });
      })
      .catch(next);
  }

  function getMatchingKeys(object, regex) {
    const keys = [];
    Object.keys(object).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(object, key) && regex.test(key)) {
        keys.push(key);
      }
    });
    return keys;
  }

  /*
   * Ensure the same number of gives and takes are selected
   * and they are not empty.
   * If the selection is valid:
   *  - send the gives and takes in res.locals to the next route (acceptRequest)
   * Otherwise:
   *  - save the selection in the session.requestXXX and redirect back to /select
   */
  function isValidSelection(req, res, next) {
    let invalidSelection;
    const requestKey = `request${req.params.id}`;
    const gives = getMatchingKeys(req.body, /^give/).map(key => key.slice(4));
    const takes = getMatchingKeys(req.body, /^take/).map(key => key.slice(4));

    if (!gives.length) {
      invalidSelection = true;
      req.flash('info', { warning: 'Trade must include at least one book to give' });
    }
    if (!takes.length) {
      invalidSelection = true;
      req.flash('info', { warning: 'Trade must include at least one book to take' });
    }
    if (takes.length !== gives.length) {
      invalidSelection = true;
      req.flash('info', { warning: 'The number of books given must equal the number taken' });
    }
    if (invalidSelection) {
      req.session[requestKey] = { gives, takes };
      return res.redirect(`/requests/${req.params.id}/select`);
    }
    res.locals.gives = gives;
    res.locals.takes = takes;
    delete req.session[requestKey];
    return next();
  }

  function extractBooks(req, res, next) {
    const ids = getMatchingKeys(req.body, /^book/).map(key => key.slice(4));
    Book.find({ _id: { $in: ids } })
    .populate('owner')
    .then((books) => {
      if (req.params.type !== 'takes') {
        req.session.gives = books.filter(book => book.owner.id === req.user.id);
      }
      if (req.params.type !== 'gives') {
        req.session.takes = books.filter(book => book.owner.id !== req.user.id);
      }
      res.redirect('/requests/new');
    })
    .catch(next);
  }

  return {
    index,
    myIndex,
    addBook,
    removeBook,
    bookRequests,
    selectGives,
    selectTakes,
    extractBooks,
    isValidSelection,
  };
}());

module.exports = booksController;
