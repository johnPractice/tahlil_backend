const rout = require('express').Router();
const auth = require('../../middelware/auth');
const classModel = require('../../db/model/classModel');

//get info about class search
rout.post('/leave', auth, async(req, res) => {
    try {
        const user = req.user;
        const info = req.body;
        if (!info.classId)
            throw { message: "Invalid classId", code: 400 };
        const Class = await classModel.findOne({ classId: info.classId });
        if (!Class)
            throw { message: "Invalid classId", code: 400 };

        await Class.removeUser(user._id);
        res.sendStatus(200);

    } catch (err) {
        if (!err.code)
            err.code = 400;
        res.status(err.code).json({ error: err.message });
    }
});

module.exports = rout;