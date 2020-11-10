const rout = require('express').Router();
const auth = require('../../middelware/auth');
const classModel = require('../../db/model/classModel');

rout.post('/', auth, async(req, res) => {
    try {
        const user = req.user;
        const info = req.body;

        if (Object.keys(info).length == 0)
            throw { message: "Request body is empty", code: 400 };

        const canUse = ['name', 'description'];//, 'classId'];
        const newClass = new classModel();
        canUse.forEach(use => {
            if (info[use])
                newClass[use] = info[use];
        });
        newClass.owner = user._id;

        await newClass.save();

        res.status(200).json({ newClass });

    } catch (err) {
        if (!err.code || err.code >= 600)
            err.code = 400;
        res.status(err.code).json({ error: err.message });
    }
});

module.exports = rout;