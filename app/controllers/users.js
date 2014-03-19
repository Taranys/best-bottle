'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
    res.render('users/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {
    res.render('users/signup', {
        title: 'Sign up',
        user: new User()
    });
};

/**
 * Edit current user
 */
exports.edit = function(req, res) {
    //if user doesn't exist, go to login view
    if( ! req.user ) {
        return res.render( 'users/signin', {
            message: 'You have to be connected to edit your profile',
            title: 'Signin'
        });
    }
    // otherwise, show the edit view :)
    res.render('users/editme', {
        title: 'Edit current user',
        user: req.user
    });
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
    res.redirect('/');
};

/**
 * Create user
 */
exports.create = function(req, res, next) {
    var user = new User(req.body);
    var message = null;

    user.provider = 'local';
    user.save(function(err) {
        if (err) {
            switch (err.code) {
                case 11000:
                case 11001:
                    message = 'Username already exists';
                    break;
                default:
                    message = 'Please fill all the required fields';
            }

            return res.render( 'users/signup', {
                message: message,
                user: user
            });
        }
        req.logIn(user, function(err) {
            if (err) return next(err);
            return res.redirect('/');
        });
    });
};

/**
 * Create user
 */
exports.update = function(req, res, next) {
    console.log(req.body);

    //Search current user
    User.findOne({ _id: req.body._id }).exec(function(err, user) {
        if (err) return next(err);

        user.email = req.body.email;
        user.name = req.body.name;
        user.password = req.body.password;
        user.username = req.body.username;

        user.save(function(err) {
            if( err ) {
                return res.render( 'users/editme', {
                    message: err.message,
                    user: req.body
                });
            }
            req.logIn(user, function(err) {
                if (err) return next(err);
                return res.redirect('/');
            });
        });
    });
//
//    user.provider = 'local';
//    user.update( req.body, {}, function(err) {
//        if (err) {
//            console.log(err);
//            var message = "";
//            switch (err.code) {
//                case 11000:
//                case 11001:
//                    message = 'Username already exists';
//                    break;
//                default:
//                    message = 'Please fill all the required fields';
//            }
//
//            return res.redirect( 'editme', {
//                message: message,
//                user: user
//            });
//        }
//        req.logIn(user, function(err) {
//            if (err) return next(err);
//            return res.redirect('/');
//        });
//    });
};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};