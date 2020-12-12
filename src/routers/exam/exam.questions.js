const auth = require('../../middelware/auth');
const checkExamId = require('../../middelware/exam/checkExamId');
const checkClassAccess = require('../../middelware/class/checkClassAccess');
const checkExamTime = require('../../middelware/exam/checkExamTime');

const rout = require('express').Router();

rout.get('/:examId/questions', auth, checkExamId, checkClassAccess, checkExamTime, async (req, res) => {
    try {
        const { exam, user_exam, user_examEndTime } = req;

        const questions = exam.getQuestions("question imageQuestion type options");

        user_exam.answers.forEach(answer => {
            let questionObj = questions.find(obj => obj.index == answer.questionIndex);
            questionObj.answerText = answer.answerText;
            questionObj.answerFile = answer.answerFile;
        });

        res.status(200).json({ questions, user_examEndTime });

    } catch (err) {
        //console.log(err)
        if (!err.code || err.code >= 600)
            err.code = 503;
        res.status(err.code).json({ error: err.message });
    }
});
module.exports = rout;