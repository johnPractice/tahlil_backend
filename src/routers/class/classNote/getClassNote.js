const auth = require('../../../middelware/auth');
const checkClassId = require('../../../middelware/class/checkClassId');
const checkClassAccess = require('../../../middelware/class/checkClassAccess');

const rout = require('express').Router();

rout.get('/:classId/notes', auth, checkClassId, checkClassAccess, async (req, res, next) => {
    try {
        const { Class } = req;
        await Class.populate('notes').execPopulate();
        const classNotes =
            await Promise.all(
                Class.notes.map(async (note) => {
                    return await note.toJSON();
                })
            );

        res.status(200).json({ classNotes });

    } catch (err) { next(err); }
});
module.exports = rout;