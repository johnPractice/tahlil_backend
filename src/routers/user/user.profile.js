const rout = require('express').Router();
const auth = require('../../middelware/auth');
const avatarSave = require('../../middelware/avatarSave');
const constants = require('../../../constants');
const existPath = require('./../../functions/existFolder');
const fs = require('fs');
const sharp = require('sharp');

//get profile user
rout.get('/', auth, async(req, res) => {
    try {
        const user = await req.user.populate({ path: 'class' }).execPopulate();
        let resultClass = [];
        if (user.class.length > 0) {

            user.class.forEach(item => {
                let userClass = {};
                userClass.name = item.name;
                userClass.classId = item.classId;
                userClass.iamge = item.image;
                userClass.description = item.description;
                resultClass.push(userClass);
            });

        }
        const userObject = user.toObject();
        delete userObject.class;

        res.json({ user: userObject, class: resultClass });
    } catch (e) { res.status(400).json(e); }
});

// update user profile
rout.put('/', auth, async(req, res) => {
    try {
        const info = req.body;
        if (!info) res.status().json();
        const canUse = ['firstname', 'lastname', 'username', 'email', 'password', 'birthday'];
        const user = req.user;

        canUse.forEach(item => {
            if (info[item] && user[item] != info[item]) {
                user[item] = info[item];
            }
        });
        if (info.avatar) {
            const add = await existPath(['public', 'uploads', 'avatar']);
            if (add != false) {
                const nameImage = info.avatarname;
                const img = info.avatar;
                // eslint-disable-next-line no-undef
                var realFile = Buffer.from(img, "base64");
                realFile = await sharp(realFile).resize({ width: 250, height: 250 }).png().toBuffer();
                const pathImage = add + '/' + nameImage + '-' + Date.now() + 'avatar' + user._id.toString() + '.png';
                await fs.writeFile(pathImage, realFile, async function(err) {
                    if (err) {
                        console.log(err);
                        throw new Error('image file have some problem');
                    }
                });
                let path = pathImage;
                path = (constants.buildMode ? constants.urlName : constants.usrAddLocal) + path;
                path = path.replace('public', "");
                path = path.replace('./', '');
                path = path.replace("\\", "/");
                user.avatar = path;
            }
        }
        await user.save();
        res.json({ 'message': 'user updated successfully', user });
    } catch (e) {
        // console.log(e);
        res.status(400).json({ e, "error": "somthing wrong" });
    }
});
// upload avatar
rout.put('/avatar', auth, avatarSave.single('avatar'), async(req, res) => {
    try {
        const user = req.user;
        const file = req.file;
        let { path } = file;
        if (!req.file) res.status(400).json({ "error": "add image to add you avatar" });
        path = path.replace('public', "");
        path = path.replace("\\", "/");
        path = (constants.buildMode ? constants.urlName : constants.usrAddLocal) + path;
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
        else res.status(401).json({ 'message': 'you should add avatar' });
    } catch (e) {
        // console.log(e);
        res.status(400).json(e);
    }
});

module.exports = rout;