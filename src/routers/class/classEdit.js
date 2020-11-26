const rout = require('express').Router();
const auth = require('../../middelware/auth');
const checkClassId = require('../../middelware/class/checkClassId');
const checkClassAdmin = require('../../middelware/class/checkClassAdmin');
const { nanoid } = require('nanoid');

rout.put('/:classId', auth, checkClassId, checkClassAdmin, async (req, res) => {
    try {
        const newInfo = req.body;
        const classToEdit = req.Class;

        if (Object.keys(newInfo).length == 0)
            throw { message: "Request body is empty", code: 400 };

        const canUpdate = ['name', 'description'];
        canUpdate.forEach(property => {
            if (newInfo[property])
                classToEdit[property] = newInfo[property];
        });

        if (newInfo.generateNewClassId === true)
            classToEdit.classId = nanoid(6);

        await classToEdit.save();
        res.status(200).json({ editedClass: classToEdit });

    } catch (err) {
        if (!err.code || err.code >= 600)
            err.code = 400;
        res.status(err.code).json({ error: err.message });
    }
});
module.exports = rout;