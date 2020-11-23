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
            throw { message: "Request body is empty", code: 400 };

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

        await newNote.populate('creator', 'firstname lastname avatar').execPopulate();
        res.status(201).json({ newNote });

    } catch (err) {
        if (!err.code || err.code >= 600)
            err.code = 400;
        res.status(err.code).json({ error: err.message });
    }
});

module.exports = rout;