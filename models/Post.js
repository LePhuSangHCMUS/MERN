const ObjectID = require('mongodb').ObjectID;
const Schema = require('mongoose').Schema
const Model = require('mongoose').model;
const PostSchema = new Schema({
    userId: {
        type: ObjectID,
        ref: 'user'
    },
    //Comment minh tao ra
    text: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
    //likes gom mang nhung doi tuong minh likes
    likes: [

        {
            userId: {
                type: ObjectID,
                ref: 'user'
            }
        }
    ],
    //Comment comment cho nguoi khac
    comment: [
        {
            userId: {
                type: ObjectID,
                ref: 'user'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String,
            },
            avatar: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now()
    }

});

module.exports = Model('post', PostSchema);
