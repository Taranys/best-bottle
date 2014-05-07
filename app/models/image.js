'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Beer Schema
 */
var ImageSchema = new Schema({
    contentType : {
        type: String,
        default: 'image/*',
        trim: true
    },
    binary : Buffer
});

/**
 * Statics
 */
ImageSchema.statics.load = function(id, cb) {
    this.findOne({ _id: id }).exec(cb);
};

mongoose.model('Image', ImageSchema);
