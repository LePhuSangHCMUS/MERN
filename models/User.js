const ObjectID = require('mongodb').ObjectID;
const Schema = require('mongoose').Schema
const Model = require('mongoose').model;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }


});

module.exports = Model('user', UserSchema);
