const rout = require('express').Router();
const auth = require('../../middelware/auth');
const classModel = require('../../db/model/classModel');

//get info about class search
rout.post('/join', auth, async(req, res) => {
    try {
        const user = req.user;
        const info = req.body;
        let checkUser = false;
        if (!info.classId || !info.password) res.status(400).json({ "error": "must input valid thing" });
        const classesResult = await classModel.findOne({ classId: info.classId });
        if (!classesResult) {
            res.status(400).json({ "error": "somthing wrong" });
            return;
        }
        if (classesResult.owner.toString() == user._id.toString()) res.status(400).json({ "error": "owner cant join owns class" });
        for (let i = 0; i < classesResult.members.length; i++) {
            if (classesResult.members[i].member.toString() == user._id.toString()) {
                checkUser = true;
                break;
            }
        }
        if (checkUser) {
            res.status(400).json({ "error": "you joined this class before" });
            return;
        }
        classesResult.members = classesResult.members.concat({ member: user._id });
        await classesResult.save();

        user.classes = user.classes.concat({ classId: classesResult.classId });
        await user.save();

        res.status(200).json(classesResult);

    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
});

module.exports = rout;