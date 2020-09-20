'use strict';

var path =  process.cwd();

var AppHandler = require(path + '/controllers/appHandler.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
  	} else {
      res.json({status: 'forbidden'});
    }
  }

	var appHandler = new AppHandler();


	app.route('/api/user')
		.get(function (req, res) {
      if(req.user) {
        res.json(req.user);
      } else {
        res.json({status: 'unauthenticated'});
      }
		});

  app.route('/api/users')
    .get(appHandler.getAllUsers);

  app.route('/api/pics')
    .get(appHandler.getAllPics)
    .post(isLoggedIn, appHandler.addPic)

  app.route('/api/pics/:id')
    // get all user pics. :id is user id
    .get(appHandler.getUserPics)
    // Like a pic. :id is photo id
    .post(isLoggedIn, appHandler.likePic)
    .put(isLoggedIn, appHandler.unlikePic)
    // Delete a pic. :id is photo id
    .delete(isLoggedIn, appHandler.deletePic)

	app.route('/auth/github')
		.get(passport.authenticate('github'));


	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/'
		}));

  app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});


  app.route('/*')
		.get(function (req, res) {
			res.sendFile(path + '/views/index.html');
	});
};