const nodemailer = require('nodemailer')
const constants = require('../../constants');
const User = require('../db/model/userModel');

const mailer = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: constants.mailUser,
        pass: constants.mailPass
    }
});

const signupMailOptions = {
    from: constants.mailUser,
    subject: 'Welcome',
    text: 'Hi (username),\n     Welcome to our site!\n\nNokare shoma,\n(esme site!)'
};

const deleteUserMailOptions = {
    from: constants.mailUser,
    subject: 'GoodBye',
    text: "Hi (username),\n     We're sorry to see you leave\n\nSomayye Naro,\n(esme site!)"
};
const forgotMail = {
    from: constants.mailUser,
    subject: 'forgot password',
    text: 'Hi (username),\n     Please enter the link to get your new password: \nhttp://'+(constants.buildMode ? constants.urlName : constants.usrAddLocal) + '/user/forgot/(resetPasswordToken)'
};

module.exports = { mailer, signupMailOptions, deleteUserMailOptions, forgotMail };