'use strict';

const express = require('express');
const session = require('./controllers/sessionsController');
const users = require('./controllers/usersController');
const books = require('./controllers/booksController');
const requests = require('./controllers/requestsController');
const trades = require('./controllers/tradesController');

const { isLoggedIn, destroySession, saveSession, goHome, loginCallback } = session;
const router = express.Router();

router.get('/', (req, res) => res.redirect('/books'));

router.get('/login', session.showLogin);
router.get('/logout', session.logout, destroySession, goHome);
router.get('/auth/:strategy', session.login);
router.get('/auth/:strategy/callback', loginCallback, saveSession, goHome);

router.get('/users', users.index);
router.get('/users/edit', isLoggedIn, users.edit);
router.post('/users/update', isLoggedIn, users.updateProfile);
router.get('/users/:id/', users.show);
router.get('/users/:id/books', users.books);

router.get('/books', books.index);
router.get('/books/my', isLoggedIn, books.myIndex);
router.post('/books/create', isLoggedIn, books.addBook);
router.get('/books/select/gives', isLoggedIn, books.selectGives);
router.get('/books/select/takes', isLoggedIn, books.selectTakes);
router.get('/books/:id/delete', isLoggedIn, books.removeBook);
router.get('/books/:id/requests', books.bookRequests);

router.get('/requests', requests.index);
router.get('/requests/incoming', requests.incomingRequests);
router.post('/requests/create', isLoggedIn, requests.ensureRequestIsValid, requests.addRequest);
router.get('/requests/new', isLoggedIn, requests.newRequest);
router.post('/requests/new/:type', isLoggedIn, books.extractBooks);
router.get('/requests/:id/cancel', isLoggedIn, requests.cancelRequest);
router.get('/requests/:id/reject', isLoggedIn, requests.rejectRequest);
router.get('/requests/:id/select', isLoggedIn, requests.selectBooks);
router.post('/requests/:id/accept', isLoggedIn, books.isValidSelection, requests.acceptRequest);

router.get('/trades', trades.index);

module.exports = router;
