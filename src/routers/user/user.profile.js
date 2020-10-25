const rout = require('express').Router();
const auth = require('../../middelware/auth');
const avatarSave = require('../../middelware/avatarSave');
const constants = require('../../../constants');

//get profile user
rout.get('/', auth, async(req, res) => {
    try {
        const user = req.user;
        res.json({ user });
    } catch (e) { res.status(400).json(e); }
});

// update user profile
rout.put('/update', auth, avatarSave.single('avatar'), async(req, res) => {
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
// upload avatar
rout.put('/update/avatar', auth, avatarSave.single('avatar'), async(req, res) => {
    try {
        const user = req.user;
        const file = req.file;
        let { path } = file;
        path = path.replace('public', "");
        path = path.replace("\\", "/");
        path = path.replace("//", "/");
        path = constants.usrAddLocal + path;
        user.test = path;
        await user.save();
        res.json({ 'message': 'user avatar updated successfully', user });
    } catch (e) {
        // console.log(e);
        res.status(400).json({ e, "error": "somthing wrong" });
    }
});

module.exports = rout;