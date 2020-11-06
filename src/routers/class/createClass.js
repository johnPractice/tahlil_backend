const rout = require('express').Router();
const auth = require('../../middelware/auth');
const classModel = require('../../db/model/classModel');

rout.post('/', auth, async(req, res) => {
    try {
        const user = req.user;
        const info = req.body;
        const canUse = ['name', 'image', 'description', 'classId', 'password'];
        const newClass = new classModel();
        if (Object.keys(info).length == 0) res.status(400).json({ "error": "check your input input must be somthing" });
        canUse.forEach(use => {
            if (info[use]) {
                newClass[use] = info[use];
            }
        });
        newClass.owner = user._id;

        await newClass.save();
        res.status(200).json({ 'message': 'class creat', 'info': newClass });
    } catch (e) {
        console.log(e);
        res.status(400).json({ e, "error": "check your input" });
    }
});

module.exports = rout;