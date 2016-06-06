'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UsersSchema = new Schema({
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    }
});

module.exports = mongoose.model('Userreact', UsersSchema);