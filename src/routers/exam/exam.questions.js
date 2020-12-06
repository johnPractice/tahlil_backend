const auth = require('../../middelware/auth');
const checkExamId = require('../../middelware/exam/checkExamId');
const checkClassAccess = require('../../middelware/class/checkClassAccess');
const checkExamTime = require('../../middelware/exam/checkExamTime');

const rout = require('express').Router();

rout.post('/:examId/attendees', auth, checkExamId, checkClassAccess, checkExamTime, async (req, res) => {
    try {
        const { exam, user_examEndTime } = req;

        await exam.populate('questions.question', 'question imageQuestion type options').execPopulate();

        res.status(201).json({ questions: exam.questions, user_examEndTime });

    } catch (err) {
        //console.log(err)
        if (!err.code || err.code >= 600)
            err.code = 503;
        res.status(err.code).json({ error: err.message });
    }
});
module.exports = rout;