const rout = require('express').Router();
const auth = require('../../middelware/auth');
const classModel = require('../../db/model/classModel');
const User = require('../../db/model/userModel');

rout.delete('/:classId', auth, async (req, res) => {
    try {
        const user = req.user;
        const classToDelete = await classModel.findOne({ classId: req.params.classId });

        if (!classToDelete)
            throw { "message": "Invalid classId", code: 400 };

        if (!user._id.equals(classToDelete.owner))
            throw { "message": "Permission denied", code: 403 };

        //remove class from every member.classes
        await classToDelete.members.forEach(async (obj) => {
            let member = await User.findById(obj.member);
            member.classes = member.classes.filter(obj => !classToDelete._id.equals(obj.objectId));
            await member.save();
        });
        //remove class from owner.classes
        user.classes = user.classes.filter(obj => !classToDelete._id.equals(obj.objectId));
        await user.save();
        //delete class
        await classModel.deleteOne(classToDelete);
        res.sendStatus(200);

    } catch (err) {
        console.log(err);
        if (!err.code)
            err.code = 400;
        res.status(err.code).json({ error: err.message });
    }
})

module.exports = rout;