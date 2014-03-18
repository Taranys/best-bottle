'use strict';

// User routes use users controller
var users = require('../controllers/users');
var authorization = require('./middlewares/authorization');

module.exports = function(app, passport) {

    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);
    app.get('/editme', users.edit);
    app.get('/users/me', users.me);

    // Setting up the users api
    app.post('/users', users.create);
    app.post('/users/:userId', authorization.requiresLogin, users.update);

    // Setting up the userId param
    app.param('userId', users.user);

    // Setting the local strategy route
    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: true
    }), users.session);
};
