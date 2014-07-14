'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Beer Schema
 */
var CommonSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    }
});

mongoose.model('Common', CommonSchema, 'bottles');
