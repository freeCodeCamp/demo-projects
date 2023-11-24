
const GitHubStrategy = require('passport-github2').Strategy;
const User = require("../models/user.js")

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id).populate("events")
        .then((user) => {
            done(null, user)
        })
        .catch((err) => done(err))
	});

  passport.use(new GitHubStrategy({
		clientID: process.env.GITHUB_CLIENT_ID,
		clientSecret: process.env.GITHUB_CLIENT_SECRET,
		callbackURL: process.env.GITHUB_CALLBACK_URL
	},
	async function (token, refreshToken, profile, done) {
		process.nextTick(function () {
			User.findOne({ 'github.id': profile.id })
            .then((user) => {
                if(user) {
                    return done(null, user);
                } else {
                    const newUser = new User();
    
                    newUser.github.id = profile.id;
                    newUser.github.username = profile.username;
                    newUser.github.displayName = profile.displayName;
                    newUser.github.imageUrl = profile.photos[0].value;
                    newUser.events = []
    
                    newUser.save()
                    .then(() => {
                        return done(null, newUser)
                    })
                    .catch((err) => {
                        throw err
                    })
                }
            })
            .catch((err) => {
                return done(err)
            })
		});
	}));
};
