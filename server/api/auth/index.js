'use strict';

var express = require('express');
var passport = require('passport');
var TwitterStrategy  = require('passport-twitter').Strategy;

var User       = require('../users/user.model');


// used to serialize the user for the session
passport.serializeUser(function(user, done) {
//    console.log("passport serialize user .id", user);
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
//    console.log("passport DEserialize ID ", id);
    User.findById(id, function(err, user) {
        //console.log("passport DEserialize user found ", user);
        done(err, user);
    });
});

// =========================================================================
// TWITTER =================================================================
// =========================================================================
passport.use(new TwitterStrategy({

    consumerKey     : process.env.consumerKey || "VFdzIHhFl6pJuqusZT69MZqrJ",
    consumerSecret  : process.env.consumerSecret||"5wD3whpreRxSHIG3bmSQc56LuxwnmEUhoa4tEYf1oHOb9HAJXf",
    callbackURL     : process.env.callbackURL|| "https://albumreact-moisesman.c9users.io/auth/twitter/callback"

    },
    function(token, tokenSecret, profile, done) {
//        console.log("twitterStrategy callback");
        // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Twitter
        process.nextTick(function() {
    
            User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
    
                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);
    
                // if the user is found then log them in
                if (user) {
                    //console.log("user exist");
                    return done(null, user); // user found, return that user
                } else {
                    
                    // if there is no user, create them
                    var newUser                 = new User();
    
                    // set all of the user data that we need
                    newUser.twitter.id          = profile.id;
                    newUser.twitter.token       = profile.token;
                    newUser.twitter.username    = profile.username;
                    newUser.twitter.displayName = profile.displayName;
    
                    // save our user into the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        //console.log("user created");
                        return done(null, newUser);
                    });
                }
            });
    
        });
    
    })
);


/*
app.get('/auth/twitter',
  passport.authenticate('twitter'));
app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
*/
var router = express.Router();

router
  .get('/twitter', passport.authenticate('twitter'))

  .get('/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/successLogin',
    failureRedirect: '/'
//    session: false
  }))


  .get('/logout', function(req, res) {
        req.logout();
        res.redirect('/successLogout');
    });
    
    

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    //res.redirect('/');

    return res.status(401).send({ error: "Unauthorized, login first." });
    
    //res.status(401);
    //return next(new Error("Unauthorized, login first."));

}

module.exports.router=router;
module.exports.isLoggedIn= isLoggedIn;
