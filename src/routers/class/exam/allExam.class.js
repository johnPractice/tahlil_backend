const rout = require('express').Router();
const auth = require('../../../middelware/auth');
const Exam = require('../../../db/model/examModel');
const Class = require('../../../db/model/classModel');
const checkClassId = require('../../../middelware/class/checkClassId');
const checkClassAccess = require('../../../middelware/class/checkClassAccess');
const checkClassAdmin = require('../../../middelware/class/checkClassAdmin');
rout.get('/:classId/exams', auth,checkClassId,checkClassAccess, async(req, res) => {
    try {
        const { Class } = req;
        
        const exams = await Exam.find({ useInClass: Class.classId }, '_id startDate name endDate examLength');
        
        res.status(200).json({ exams });
    } catch (e) {
        //console.log(e);
        if (e.message) {
            res.status(400).json({ "error": e.message });
            return;
        }
        res.status(400).json({ "error": "مشکلی رخ داده است" });
    }
});
rout.get('/:classId/exams/:examId', auth, checkClassId, checkClassAdmin, async (req, res) => {
    try {
        const { Class } = req;
        await Class.populate({
            path: 'exams',
            match: { _id: req.params.examId }
        }).execPopulate();

        if (Class.exams.length == 0)
            throw { message: "Invalid examId", code: 400 };

        res.status(200).json({ exam: Class.exams[0] });

    } catch (err) {
        if (!err.code || err.code >= 600)
            err.code = 503;
        res.status(err.code).json({ error: err.message });
    }
});
module.exports = rout;