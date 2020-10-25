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
        if (!req.file) res.status(400).json({ "error": "add image to add you avatar" });
        path = path.replace('public', "");
        path = path.replace("\\", "/");
        path = path.replace("//", "/");
        path = (constants.buildMode ? constants.urlAdd : constants.usrAddLocal) + path;
        user.avatar = path;
        await user.save();
        res.json({ 'message': 'user avatar updated successfully', user });
    } catch (e) {
        // console.log(e);
        res.status(400).json({ e, "error": `somthing wrong! 
         one solution you shoud add image for avatar` });
    }
});

// get avatar image
rout.get('/avatar', auth, (req, res) => {
    try {
        const user = req.user;
        if (user.avatar)
            res.status(200).json({ 'avatar': user.avatar });
        else res.status(200).json({ 'message': 'you should add avatar' });
    } catch (e) {
        // console.log(e);
        res.status(400).json(e);
    }
});

module.exports = rout;