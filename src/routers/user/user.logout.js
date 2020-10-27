const auth = require('../../middelware/auth');
const rout = require('express').Router();

//logout apis
rout.post('/logout', auth, async(req, res) => {
    try {
        const user = req.user;
        const token = req.token;
        user.tokens = user.tokens.filter((obj) => obj.token != token);
        await user.save();

        res.sendStatus(200);
    } catch (err) { res.status(400).json({ err }); }
});

rout.post('/logoutall', auth, async(req, res) => {
    try {
        const user = req.user;
        user.tokens = [];
        await user.save();
        res.sendStatus(200);

    } catch (err) { res.status(400).json({ err }); }
});


module.exports = rout;