'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Beer = mongoose.model('Beer'),
    ImageModel = mongoose.model('Image'),
    _ = require('lodash');

function convertImage(beer) {
    // if a new iamge is detected
    if( beer.newImage ) {
        var newImage = beer.newImage;
        //delete the old one
        if( beer.image ) ImageModel.remove({_id : beer.image});
        // convert base64 to byte array
        var buf = new Buffer( newImage.base64, 'base64');
        // save new object to database
        beer.image = new ImageModel({ contentType : newImage.contentType, binary : buf });
        beer.image.save();
        delete beer.newImage;
    }
    return beer;
}

/**
 * persist beer into db and response new object
 */
function saveBeer(beer, res) {
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
}

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
    var beer = new Beer(convertImage(req.body));
    beer.user = req.user;
    saveBeer(beer, res);
};

/**
 * Update an beer
 */
exports.update = function(req, res) {
    // extend db object with received object
    var beer = _.extend(req.beer, convertImage(req.body));
    // save it to db
    saveBeer(beer, res);
};

/**
 * Delete an beer
 */
exports.destroy = function(req, res) {
    var beer = req.beer;

    if( beer.image ) ImageModel.remove({ _id : beer.image });

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
