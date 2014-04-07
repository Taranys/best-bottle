'use strict';

// Beers routes use beers controller
var beers = require('../controllers/beers');
var authorization = require('./middlewares/authorization');

module.exports = function(app) {

    app.get('/beers', beers.all);
    app.post('/beers', authorization.requiresLogin, beers.create);
    app.get('/beers/:beerId', beers.show);
    app.post('/beers/:beerId', authorization.requiresLogin, beers.update);
    app.del('/beers/:beerId', authorization.requiresLogin, beers.destroy);

    // Finish with setting up the beerId param
    app.param('beerId', beers.beer);

};