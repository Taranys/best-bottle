'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Common = mongoose.model('Common');


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
    var params = [];

    //generate WHERE condition on DB request
    if( req.query ) {
        if( req.query.name ) {
            params.push({name : { $regex: req.query.name, $options: 'i' }});
        }
        if( req.query.description ) {
            params.push({description : { $regex: req.query.description, $options: 'i' }});
        }
    }

    // if not parmas requested, just perform a simple find()
    // otherwise, generate a request : find({ $or : [COND1, COND2] })
    var query = (params.length === 0) ? {} : { $or : params };

    Common.find(query).sort('name').populate('user', 'name username').exec(function(err, bottles) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(bottles);
        }
    });
};
