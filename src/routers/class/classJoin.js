const rout = require('express').Router();
const auth = require('../../middelware/auth');
const classModel = require('../../db/model/classModel');

//get info about class search
rout.post('/join', auth, async(req, res) => {
    try {
        const user = req.user;
        const info = req.body;
        if (!info.classId || !info.password) res.status(400).json({ "error": "must input valid thing" });
        const classesResult = await classModel.findOne({ classId: info.classId });
        if (!classesResult) res.status(400).json({ "message": "somthing wrong" });


        classesResult.members = classesResult.members.concat({ member: user._id });
        await classesResult.save();
        res.status(200).json(classesResult);

    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
});

module.exports = rout;