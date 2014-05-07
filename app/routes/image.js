'use strict';

// Beers routes use beers controller
var images = require('../controllers/images');

module.exports = function(app) {
    app.get('/image/:imageId', images.get);

    // Finish with setting up the beerId param
    app.param('imageId', images.image);
};