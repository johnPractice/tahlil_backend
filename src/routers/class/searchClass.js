const rout = require('express').Router();
const auth = require('../../middelware/auth');
const classModel = require('../../db/model/classModel');

//get info about class search
rout.get('/search', auth, async(req, res) => {
    try {
        const user = req.user;
        const info = req.body;
        if (!info.classId) res.status(400).json({ "error": "must input valid thing" });
        const classesResult = await classModel.findByClassId({ id: info.classId, userId: user._id });
        if (!classesResult) res.status(400).json({ "message": "somthing wrong" });
        res.status(200).json(classesResult);

    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
});

module.exports = rout;