'use strict';

// Beers routes use beers controller
var wines = require('../controllers/wines');
var authorization = require('./middlewares/authorization');

// Beer authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.beer.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/wines', wines.all);
    app.post('/wines', authorization.requiresLogin, wines.create);
    app.get('/wines/:wineId', wines.show);
    app.post('/wines/:wineId', authorization.requiresLogin, hasAuthorization, wines.update);
    app.del('/wines/:wineId', authorization.requiresLogin, hasAuthorization, wines.destroy);

    // Finish with setting up the beerId param
    app.param('wineId', wines.wine);

};