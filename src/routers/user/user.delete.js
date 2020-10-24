const auth = require('../../middelware/auth');
const User = require('../../db/model/userModel');
const rout = require('express').Router();

//user delete account
rout.delete('/delete', auth, async (req, res) => {
    try {
        const user = req.user;

        await User.findByIdAndRemove(user.id, (err) => {
            res.status(503).json(err);
        });
        res.sendStatus(200);

    } catch (e) { res.status(400).json(e); }
});