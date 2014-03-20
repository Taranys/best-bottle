'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Wine = mongoose.model('Wine'),
    _ = require('lodash');


/**
 * Find wine by id
 */
exports.wine = function(req, res, next, id) {
    Wine.load(id, function(err, wine) {
        if (err) return next(err);
        if (!wine) return next(new Error('Failed to load wine ' + id));
        req.wine = wine;
        next();
    });
};

/**
 * Create an wine
 */
exports.create = function(req, res) {
    var wine = new Wine(req.body);
    wine.user = req.user;

    wine.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                wine: wine
            });
        } else {
            res.jsonp(wine);
        }
    });
};

/**
 * Update an wine
 */
exports.update = function(req, res) {
    var wine = req.wine;

    wine = _.extend(wine, req.body);

    wine.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                wine: wine
            });
        } else {
            res.jsonp(wine);
        }
    });
};

/**
 * Delete an wine
 */
exports.destroy = function(req, res) {
    var wine = req.wine;

    wine.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                wine: wine
            });
        } else {
            res.jsonp(wine);
        }
    });
};

/**
 * Show an wine
 */
exports.show = function(req, res) {
    res.jsonp(req.wine);
};

/**
 * List of Wines
 */
exports.all = function(req, res) {
    Wine.find({ bottleType: 'Wine' }).sort('-created').populate('user', 'name username').exec(function(err, wines) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(wines);
        }
    });
};
