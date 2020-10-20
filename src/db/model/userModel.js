const mongoose = require('mongoose');
const validator = require("validator");
const constants = require('../../../constants');
const Schema = mongoose.Schema;
// create user schema
const userSchema = new Schema({
    firstname: {
        type: String,
        require: true,
        minlength: 4,
    },
    lastname: {
        type: String,
        require: true,
        minlength: 4,
    },
    username: {
        type: String,
        unique: true,
        require: true,
        minlength: 6
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                return new Error("email not valid");
            }
        },
    },
    password: {
        type: String,
        require: true,
        minlength: 6,
    },
    birthday: {
        type: Date,
    },
    avatar: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]

}, {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
});

// 

// create the user model
const User = mongoose.model('User', userSchema);
module.exports = User;