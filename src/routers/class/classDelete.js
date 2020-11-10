const rout = require('express').Router();
const auth = require('../../middelware/auth');
const classModel = require('../../db/model/classModel');

rout.delete('/:classId', auth, async (req, res) => {
    try {
        const user = req.user;
        const classToDelete = await classModel.findOne({ classId: req.params.classId });

        if (!classToDelete)
            throw { "message": "Invalid classId", code: 400 };

        if (!user._id.equals(classToDelete.owner))
            throw { "message": "Permission denied", code: 403 };

        //delete class
        await classModel.deleteOne(classToDelete);
        res.sendStatus(200);

    } catch (err) {
        if (!err.code || err.code >= 600)
            err.code = 400;
        res.status(err.code).json({ error: err.message });
    }
})

module.exports = rout;