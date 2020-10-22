const auth = require('../../middelware/auth');
const rout = require('express').Router();

//logout apis
rout.post('/logout', auth, async(req, res) => {
    try {
        const user = req.user;
        const token = req.token;
        user.tokens = user.tokens.filter((obj) => obj.token != token);
        await user.save();

        res.json({ 'message': 'logout successfully' });
    } catch (e) { res.json(e).status(400); }
});

rout.post('/logoutall', auth, async(req, res) => {
    try {
        const user = req.user;
        user.tokens = [];
        await user.save();
        res.json({ 'message': 'logout all device' });

    } catch (e) { res.json(e).status(400); }
});