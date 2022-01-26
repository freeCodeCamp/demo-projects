'use strict';

const User = require('../models/User');

module.exports = (function UserController() {
  function edit(req, res) {
    res.render('users/edit', {
      title: 'My Profile',
      user: req.user,
      active: 'editprofile',
      messages: req.flash('info'),
    });
  }

  function index(req, res, next) {
    User.find({})
    .then(users => res.render('users/index', {
      title: 'Users',
      user: req.user,
      users,
      active: 'users',
      messages: req.flash('info'),
    }))
    .catch(next);
  }

  function show(req, res, next) {
    User.findById(req.params.id)
    .then((user) => {
      if (user) {
        const active = req.params.id === (req.user || {}).id ? 'profile' : '';
        return res.render('users/show', {
          title: user.username,
          user: req.user,
          showUser: user,
          messages: req.flash('info'),
          active,
        });
      }
      req.flash('info', { warning: 'User not found' });
      return res.redirect('/users');
    })
    .catch(next);
  }

  function books(req, res, next) {
    if (req.params.id === (req.user || {}).id) res.redirect('/books/my');
    User.findById(req.params.id)
    .populate({
      path: 'books',
      populate: {
        path: 'requests',
        model: 'Request',
        populate: {
          path: 'requester',
          model: 'User',
        },
      },
    })
    .populate({
      path: 'books',
      populate: {
        path: 'owner',
        model: 'User',
      },
    })
    .then((user) => {
      if (!user) {
        req.flash('info', { warning: 'Unkown user' });
        return res.redirect('/users');
      }
      return res.render('books/index', {
        title: `${user.username}'s Books`,
        user: req.user,
        books: user.books,
        noItems: `${user.username} currently has no books`,
        messages: req.flash('info'),
      });
    })
    .catch(next);
  }

  function updateProfile(req, res, next) {
    const { username, fullName, city, state, address } = req.body;

    User.update({ _id: req.user.id }, { $set: { username, fullName, city, state, address } })
      .then(() => {
        req.flash('info', { success: 'Updated profile successfuly' });
        res.redirect(`/users/${req.user.id}`);
      })
      .catch(next);
  }

  return {
    edit,
    index,
    show,
    updateProfile,
    books,
  };
}());
