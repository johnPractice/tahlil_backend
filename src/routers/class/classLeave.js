const rout = require('express').Router();
const auth = require('../../middelware/auth');
const classModel = require('../../db/model/classModel');

//get info about class search
rout.post('/leave', auth, async(req, res) => {
    try {
        const user = req.user;
        const info = req.body;
        if (!info.classId) res.status(400).json({ "error": "must input valid thing" });
        const classesResult = await classModel.deleteUserInClass({ id: info.classId, user });
        if (!classesResult) res.status(400).json({ "message": "somthing wrong" });

        user.classes = user.classes.filter((obj) => {
            obj.classId != classesResult.classId
        });
        await user.save();

        res.status(200).json(classesResult);

    } catch (e) {
        // console.log(e);
        res.status(400).json({ "error": e });
    }
});

module.exports = rout;