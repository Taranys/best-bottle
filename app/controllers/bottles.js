'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Common = mongoose.model('Common'),
    _ = require('lodash');


/**
 * Find bottle by id
 */
exports.bottle = function(req, res, next, id) {
    Common.load(id, function(err, bottle) {
        if (err) return next(err);
        if (!bottle) return next(new Error('Failed to load bottle ' + id));
        req.bottle = bottle;
        next();
    });
};

/**
 * Show an bottle
 */
exports.show = function(req, res) {
    res.jsonp(req.bottle);
};

/**
 * List of Beers
 */
exports.all = function(req, res) {
    Common.find().sort('name').populate('user', 'name username').exec(function(err, bottles) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(bottles);
        }
    });
};
