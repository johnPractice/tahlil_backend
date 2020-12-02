const rout = require('express').Router();
const auth = require('../../middelware/auth');
const classModel = require('../../db/model/classModel');
const checkClassAdmin = require('../../middelware/class/checkClassAdmin');
const checkClassId = require('../../middelware/class/checkClassId');


rout.delete('/:classId', auth, checkClassId, checkClassAdmin, async (req, res) => {
    try {
        const classToDelete = req.Class;
        if (classToDelete.isPrivate === true)
            throw { message: "Action is not valid on private classes", code: 405 };

        await classToDelete.deleteOne();
        res.sendStatus(200);

    } catch (err) {
        if (!err.code || err.code >= 600)
            err.code = 400;
        res.status(err.code).json({ error: err.message });
    }
})

module.exports = rout;