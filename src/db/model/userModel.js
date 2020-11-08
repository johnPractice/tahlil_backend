const mongoose = require('mongoose');
const validator = require("validator");
const jwt = require('jsonwebtoken');
const constants = require('../../../constants');
const bycrypt = require('bcryptjs');
const { mailer } = require('../../functions/mailer');
const Schema = mongoose.Schema;
// create user schema
const userSchema = new Schema({
    firstname: {
        type: String,
        minlength: 3,
        default: '****'
    },
    lastname: {
        type: String,
        minlength: 3,
        default: '****'
    },
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 4
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("email not valid");
            }
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    birthday: {
        type: Date,
    },
    avatar: {
        type: String,
        default: null


    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    //doto:must be deleted
    classes: [{
        objectId: {
            type: Schema.Types.ObjectId,
            required: true
        }
    }],

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
});

// virtual for classOwner 
userSchema.virtual('classOwner', {
    ref: 'Class',
    localField: '_id',
    foreignField: 'owner'
});
// virtual for member in some class
userSchema.virtual('memberin', {
    ref: 'Class',
    localField: '_id',
    foreignField: 'members'
});
// virtual for member in some own question
userSchema.virtual('question', {
    ref: 'Question',
    localField: '_id',
    foreignField: 'owner'
});
// userSchema.pre('findOne', autoPopulateComments);

// function autoPopulateComments(next) {
//     this.populate('classOwner', 'body');
//     next();
// }

//methodes

//check username & password //static
userSchema.statics.findByCredentials = async({ username, password }) => {

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

//send mail to user
userSchema.methods.sendMail = async function(mailOptions) {
    try {
        if (!mailOptions.subject || !mailOptions.text)
            throw new Error('subject or text missing');
        if (!mailOptions.from)
            mailOptions.from = constants.mailUser;

        //set recieving email address and text
        mailOptions.to = this.email;
        mailOptions.text = mailOptions.text.replace('(username)', this.username.toString());

        mailer.sendMail(mailOptions, (err, info) => {
            if (err) throw err;
            console.log('Email Sent: ' + info.response);
        });
    } catch (e) { console.log(e); }
};

// methode for returning json object
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.createdAt;
    delete userObject.updatedAt;
    delete userObject._id;
    delete userObject.__v;
    delete userObject.classes;

    return userObject;
};

//save password hash instead, each time pass is modified
userSchema.pre('save', async function(next) {
    if (this.isModified("password"))
        this.password = await bycrypt.hash(this.password, 8);
    next();
});

// create the user model
const User = mongoose.model('User', userSchema);
module.exports = User;