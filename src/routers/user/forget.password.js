const rout = require('express').Router();
const User = require('../../db/model/userModel');
const { forgotMail } = require('../../functions/mailer');
const { nanoid } = require('nanoid');
const auth = require('../../middelware/auth');

rout.post('/forgot', async(req, res) => {
    try {
        const email = req.body.email;
        if (!email) throw { message: "email must be input somthing valid" };

        const user = await User.findOne({ email });
        if (!user) throw { message: "check your input" };

        //if (!forgotMail.subject || !forgotMail.text)
        //    throw new Error('subject or text missing');
        //if (!forgotMail.from)
        //    throw new Error('from  missing');
        //forgotMail.text = forgotMail.text.replace('(password)', '123456');
        //forgotMail.to = user.email;
        //mailer.sendMail(forgotMail, (err, info) => {
        //    if (err) throw err;
        //    console.log('Email Sent: ' + info.response);
        //});

        const resetPasswordToken = await user.genrateAuth();
        const forgotMailClone = JSON.parse(JSON.stringify(forgotMail));
        forgotMailClone.text = forgotMailClone.text.replace('(resetPasswordToken)', resetPasswordToken);
        await user.sendMail(forgotMailClone);

        res.json({ "message": "email sent" });
    } catch (e) {
        console.log(e);
        if (e.message)
            res.status(400).json({ "error": e.message });
        else {
            res.status(400).json({ "error": e });
        }
    }
});
rout.get('/forgot/:token', async (req, res) => {
    try {
        const { token } = req.params;
        req = {
            header: () => "Bearer " + token,
            isForgotPassword: true
        };
        //console.log(req);
        await auth(req, res, () => null);

        const { tokenExpiryDate, user } = req;
        console.log(tokenExpiryDate);

        if ((new Date()) > tokenExpiryDate)
            throw { message: "The link is expired. Please try again.", code: 400 };

        const newPass = nanoid(10);
        user.password = newPass;
        await user.save();
        res.json("Your new Password is: " + newPass + "  Please change your password immediately after logging in.");

    } catch (err) {
        if (!err.code || err.code >= 600)
            err.code = 400;
        res.status(err.code).json({ error: err.message });
    }
    
});
module.exports = rout;