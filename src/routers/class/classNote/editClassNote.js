const auth = require('../../../middelware/auth');
const checkClassId = require('../../../middelware/class/checkClassId');
const checkClassAdmin = require('../../../middelware/class/checkClassAdmin');
const checkClassNoteId = require('../../../middelware/class/checkClassNoteId');

const rout = require('express').Router();

rout.put('/:classId/notes/:classNoteId', auth, checkClassId, checkClassAdmin,checkClassNoteId, async (req, res) => {
    try {
        const { classNote } = req;

        const info = req.body;
        if (Object.keys(info).length == 0)
            throw { error: "Request body is empty", code: 400 };

        const properties = ['title', 'body'];
        properties.forEach(property => {
            if (info[property])
                classNote[property] = info[property];
        });
        await classNote.save();

        res.status(200).json({ editedClassNote: await classNote.toJSON() });

    } catch (err) {
        if (!err.code || err.code >= 600)
            err.code = 400;
        res.status(err.code).json({ error: err.message });
    }
})
module.exports = rout;