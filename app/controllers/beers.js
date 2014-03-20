'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Beer = mongoose.model('Beer'),
    _ = require('lodash');


/**
 * Find beer by id
 */
exports.beer = function(req, res, next, id) {
    Beer.load(id, function(err, beer) {
        if (err) return next(err);
        if (!beer) return next(new Error('Failed to load beer ' + id));
        req.beer = beer;
        next();
    });
};

/**
 * Create an beer
 */
exports.create = function(req, res) {
    var beer = new Beer(req.body);
    beer.user = req.user;

    beer.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                beer: beer
            });
        } else {
            res.jsonp(beer);
        }
    });
};

/**
 * Update an beer
 */
exports.update = function(req, res) {
    var beer = req.beer;

    beer = _.extend(beer, req.body);

    beer.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                beer: beer
            });
        } else {
            res.jsonp(beer);
        }
    });
};

/**
 * Delete an beer
 */
exports.destroy = function(req, res) {
    var beer = req.beer;

    beer.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                beer: beer
            });
        } else {
            res.jsonp(beer);
        }
    });
};

/**
 * Show an beer
 */
exports.show = function(req, res) {
    res.jsonp(req.beer);
};

/**
 * List of Beers
 */
exports.all = function(req, res) {
    Beer.find({ bottleType: 'Beer' }).sort('-created').populate('user', 'name username').exec(function(err, beers) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(beers);
        }
    });
};
