var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var config = require('./config');
var User = require('./models/user');

// passport config

exports.local = passport.use(new LocalStrategy(User.authenticate));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.facebook = passport.use(new FacebookStrategy({
	clientID: config.facebook.clientID,
	clientSecret: config.facebook.clientSecret,
	callbackURL: config.facebook.callbackURL
}, function (accessToken, refreshToken, profile, done) {
	User.findOne({oauthId: profile.id}, function (err, user) {
		if (err)
			console.log(err);
		
		if (!err && user !== null) {
			console.log("User already exists");
			done(null, user);
		} else {
			user = new User({
				username: profile.displayName
			});
			user.oauthId = profile.id;
			user.oauthToken = accessToken;
			
			user.save(function (err) {
				if (err) {
					console.log(err)
				} else {
					console.log("New user saved into database");
					done(null, user);
				}
			});
		}
	});
}));