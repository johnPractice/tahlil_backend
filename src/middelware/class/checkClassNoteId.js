const classModel = require('../../db/model/classModel');
const classNoteModel = require('../../db/model/classNoteModel');

const checkClassNoteId = async (req, res, next) => {
    try {
        const { Class } = req;
        const { classNoteId } = req.params;

        if (!classNoteId)
            throw { message: "Invalid classNoteId", code: 400 };

        const classNoteIndex = Class.notes.indexOf(classNoteId);
        if (classNoteIndex == -1)
            throw { message: "Invalid classNoteId", code: 400 };

        const classNote = await classNoteModel.findById(Class.notes[classNoteIndex]);

        req.classNote = classNote;
        next();

    } catch (err) {
        if (!err.code || err.code >= 600)
            err.code = 400;
        res.status(err.code).json({ error: err.message });
    }
};
module.exports = checkClassNoteId;