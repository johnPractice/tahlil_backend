const auth = require('../../middelware/auth');
const checkExamId = require('../../middelware/exam/checkExamId');
const checkClassAccess = require('../../middelware/class/checkClassAccess');
const checkExamTime = require('../../middelware/exam/checkExamTime');
const user_examModel = require('../../db/model/user-examModel');

const rout = require('express').Router();

rout.get('/:examId/questions', auth, checkExamId, checkClassAccess, checkExamTime, async (req, res) => {
    try {
        const { exam, user_exam, user_examEndTime } = req;

        //const questions = exam.getQuestions("question imageQuestion type options");

        //user_exam.answers.forEach(answer => {
        //    let questionObj = questions.find(obj => obj.index == answer.questionIndex);
        //    questionObj.answerText = answer.answerText;
        //    questionObj.answerFile = answer.answerFile;
        //});

        const questions = await user_exam.getQuestionsWithUserAnswers();

        res.status(200).json({ name: exam.name, questions, user_examEndTime });

    } catch (err) {
        //console.log(err)
        if (!err.code || err.code >= 600)
            err.code = 503;
        res.status(err.code).json({ error: err.message });
    }
});
rout.get('/:examId/questions/review', auth, checkExamId, checkClassAccess, async (req, res) => {
    try {
        const { exam, user } = req;
        if ((new Date()) <= exam.endDate)
            throw { message: "زمان آزمون هنوز به اتمام نرسیده است", code: 403 };

        const user_exam = await user_examModel.findOne({ user: user._id, exam: exam._id });
        if (!user_exam)
            throw { message: "شما در این آزمون شرکت نکرده‌اید", code: 403 };

        const questions = await user_exam.getQuestionsWithUserAnswers({ getQuestionAnswers: true });

        res.status(200).json({ questions });

    } catch (err) {
        //console.log(err)
        if (!err.code || err.code >= 600)
            err.code = 503;
        res.status(err.code).json({ error: err.message });
    }
});
module.exports = rout;