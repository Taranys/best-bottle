'use strict';

// Beers routes use beers controller
var beers = require('../controllers/beers');
var authorization = require('./middlewares/authorization');

// Beer authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.beer.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/beers', beers.all);
    app.post('/beers', authorization.requiresLogin, beers.create);
    app.get('/beers/:beerId', beers.show);
    app.put('/beers/:beerId', authorization.requiresLogin, hasAuthorization, beers.update);
    app.del('/beers/:beerId', authorization.requiresLogin, hasAuthorization, beers.destroy);

    // Finish with setting up the beerId param
    app.param('beerId', beers.beer);

};