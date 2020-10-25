const nodemailer = require('nodemailer')
const constants = require('../../constants')

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
    text: 'Hi (name)\nWelcome to our site!\n\nNkare shoma,\nesme site!'
};

module.exports = { mailer, signupMailOptions };