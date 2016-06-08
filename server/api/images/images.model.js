'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var ImagesSchema = new Schema({
        userId     : String,
        imageURL   : String,
        title      : String,
        likesCount : Number
});


module.exports = mongoose.model('Images', ImagesSchema);