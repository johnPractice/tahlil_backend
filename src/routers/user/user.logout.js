const auth = require('../../middelware/auth');
const rout = require('express').Router();

//logout apis
rout.post('/logout', auth, async(req, res) => {
    try {
        const user = req.user;
        const token = req.token;
        user.tokens = user.tokens.filter((obj) => obj.token != token);
        await user.save();

        res.status(200).json({ 'message': 'logout successfully' });
    } catch (e) { res.status(400).json(e); }
});

rout.post('/logoutall', auth, async(req, res) => {
    try {
        const user = req.user;
        user.tokens = [];
        await user.save();
        res.status(200).json({ 'message': 'logout all device' });

    } catch (e) { res.status(400).json(e); }
});


module.exports = rout;