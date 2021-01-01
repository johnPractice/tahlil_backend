const auth = require('../../../middelware/auth');
const checkClassId = require('../../../middelware/class/checkClassId');
const checkClassAdmin = require('../../../middelware/class/checkClassAdmin');
const checkClassNoteId = require('../../../middelware/class/checkClassNoteId');

const rout = require('express').Router();

rout.delete('/:classId/notes/:classNoteId', auth, checkClassId, checkClassAdmin, checkClassNoteId, async (req, res) => {
    try {
        const { Class,classNote } = req;

        await classNote.deleteOne(err => {
            if (err)
                res.sendStatus(503);
        });
        Class.notes.remove(classNote._id);

        res.sendStatus(200);

    } catch (err) { next(err); }
});
module.exports = rout;