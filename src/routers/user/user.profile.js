const rout = require('express').Router();
const auth = require('../../middelware/auth');

//get profile user
rout.get('/', auth, async(req, res) => {
    try {
        const user = req.user;
        res.json({ user });
    } catch (e) { res.status(400).json(e); }
});

// update user profile
rout.put('/update', auth, async(req, res) => {
    try {
        const info = req.body;
        const canUse = ['firstname', 'lastname', 'username', 'email', 'password', 'birthday'];
        const user = req.user;

        canUse.forEach(item => {
            if (info[item] && user[item] != info[item]) {
                user[item] = info[item];
            }
        });
        await user.save();
        res.json({ 'message': 'user updated successfully', user });
    } catch (e) {
        // console.log(e);
        res.status(400).json({ e, "error": "somthing wrong" });
    }
});

module.exports = rout;