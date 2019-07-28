const ObjectID = require('mongodb').ObjectID;
const Schema = require('mongoose').Schema
const Model = require('mongoose').model;
const ProfileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        //nho la user khong phai users
        ref: 'user'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    company: {
        type: String,
    },
    website: {
        type: String,
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },
    skills: {
        type: Array,
        required: true
    },
    //Neu la mang chua nhieu doi duong thi requied se bao lioi neu khong nhap
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: String,
            from: {
                type: Date,
                required: true
            },
            to: {
                type: String,
            },
            current: {
                type: Boolean,
                default: false
            },
            description: String

        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: String,
            },
            current: {
                type: Boolean,
                default: false
            },
            description: String
        }

    ],
    social: {
        youtube: String,
        twitter: String,
        facebook: String,
        linkedin: String,
        instagram: String
    },
    data: {
        type: Date,
        default: Date.now
    }

});

module.exports = Model('profile', ProfileSchema);
