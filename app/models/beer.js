'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Beer Schema
 */
var BeerSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    image: {
        type: String,
        default: ''
    },
    rate : {
        type : Number,
        default : 0
    },
    created: {
        type: Date,
        default: Date.now
    },
    country: {
        type: String,
        default: '',
        trim: true
    },
    bottleType: {
        type: String,
        enum: ['Beer'],
        default: 'Beer',
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
BeerSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

/**
 * Statics
 */
BeerSchema.statics.load = function(id, cb) {
    this.findOne({ _id: id })
        .populate('user', 'name username')
        .exec(cb);
};

mongoose.model('Beer', BeerSchema, 'bottles');
