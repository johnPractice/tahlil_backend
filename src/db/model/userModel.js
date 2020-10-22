const mongoose = require('mongoose');
const validator = require("validator");
const jwt = require('jsonwebtoken');
const constants = require('../../../constants');
const bycrypt = require('bcryptjs');
const { use } = require('../../routers/user/user.login');
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

//methodes

//check username & password //static
userSchema.statics.findByCredentials = async ({ username, password }) => {

    const user = await User.findOne({ username });
    if (!user) throw new Error("User not found");

    const PassIsMatched = await bycrypt.compare(password, user.password);
    if (!PassIsMatched) throw new Error("Wrong Password");

    return user;
};

// create token
userSchema.methods.genrateAuth = async function() {
    try {
        const user = this;
        const token = await jwt.sign({
            _id: user._id.toString()
        }, constants.jwtSecret);
        // add to user token
        user.tokens = user.tokens.concat({
            token
        });
        await user.save();
        return token;
    } catch (e) {
        throw new Error(e);
    }
};

// methode for returning json object
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.createdAt;
    delete userObject.updatedAt;

    return userObject;
};

//save password hash instead each time pass is modified
userSchema.pre('save', async function (next) {
    if (this.isModified("password"))
        this.password = await bycrypt.hash(this.password, 8);
    next();
});

// create the user model
const User = mongoose.model('User', userSchema);
module.exports = User;