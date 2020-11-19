const rout = require('express').Router();
const User = require('../../db/model/userModel');
const { forgotMail, mailer } = require('../../functions/mailer');

rout.post('/forgot', async(req, res) => {
    try {
        const email = req.body.email;
        if (!email) res.status(400).json({ "error": "email must be input somthing valid" });
        const user = await User.findOne({ email });
        if (!user) res.status(400).json({ "error": "check your input" });
        user.password = '123456';
        if (!forgotMail.subject || !forgotMail.text)
            throw new Error('subject or text missing');
        if (!forgotMail.from)
            throw new Error('from  missing');
        forgotMail.text = forgotMail.text.replace('(password)', '123456');
        forgotMail.to = user.email;
        mailer.sendMail(forgotMail, (err, info) => {
            if (err) throw err;
            console.log('Email Sent: ' + info.response);
        });
        await user.save();
        res.json({ "message": "email send" });
    } catch (e) {
        console.log(e);
        if (e.message)
            res.status(400).json({ "error": e.message });
        else {
            res.status(400).json({ "error": e });
        }
    }
});
module.exports = rout;