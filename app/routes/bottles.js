'use strict';

// Beers routes use beers controller
var bottles = require('../controllers/bottles');

module.exports = function(app) {

    app.get('/bottles', bottles.all);
    app.get('/bottles/:bottleId', bottles.show);

    // Finish with setting up the beerId param
    app.param('bottleId', bottles.bottle);

};