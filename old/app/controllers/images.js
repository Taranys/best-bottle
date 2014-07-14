'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    ImageModel = mongoose.model('Image');

/**
 * Find beer by id
 */
exports.get = function(req, res) {
    res.writeHead(200, {'Content-Type': req.image.contentType });
    res.end(req.image.binary, 'binary');
};

/**
 * Find beer by id
 */
exports.image = function(req, res, next, id) {
    ImageModel.load( id, function(err, image) {
        if (err) return next(err);
        if (!image) return next(new Error('Failed to load image ' + id));
        req.image = image;
        next();
    });
};
