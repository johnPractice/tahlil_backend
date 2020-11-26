const rout = require('express').Router();
const auth = require('../../../middelware/auth');
const checkClassId = require('../../../middelware/class/checkClassId');
const checkClassAdmin = require('../../../middelware/class/checkClassAdmin');
const classNoteModel = require('../../../db/model/classNoteModel');

rout.post('/:classId/notes', auth, checkClassId, checkClassAdmin, async (req, res) => {
    try {
        const { user, Class } = req;

        const info = req.body;
        if (Object.keys(info).length == 0)
            throw { error: "Request body is empty", code: 400 };

        const newNote = new classNoteModel();
        const properties = ['title', 'body'];
        properties.forEach(property => {
            if (info[property])
                newNote[property] = info[property];
        });
        newNote.creator = user._id;

        await newNote.save();
            
        Class.notes.push(newNote._id)
        await Class.save();

        res.status(201).json({ newClassNote: await newNote.toJSON() });

    } catch (err) {
        if (!err.code || err.code >= 600)
            err.code = 400;
        res.status(err.code).json({ error: err.message });
    }
});

module.exports = rout;