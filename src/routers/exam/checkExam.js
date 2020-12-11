const rout = require('express').Router();
const userExamModel = require('../../db/model/user-examModel');
const auth = require('../../middelware/auth');
const checkExamId = require('../../middelware/exam/checkExamId');
const checkClassAccess = require('../../middelware/class/checkClassAccess');
const checkExamTime = require('../../middelware/exam/checkExamTime');
const checkQuestionIndex = require('../../middelware/exam/checkQuestionIndex');


rout.post('/:examId/check', auth, checkExamId, checkClassAccess, checkExamTime, checkQuestionIndex, async(req, res) => {
    try {
        const { questionObj, user_exam, user_examEndTime, exam, user } = req;
        if (!exam || !user) {
            res.status(400).json({ "error": "شما مجاز به دسترسی به این ادرس نیستید" });
            return;
        }
        const userExam = await userExamModel.findOne({ user: user._id, exam });
        if (!userExam || !userExam.answers.length) {
            res.status(400).json({ "error": "مشکلی رخ داده است" });
            return;
        }
        const checkedItem = [];
        userExam.answers.forEach(answer => {
            const temp = {};
            temp.question = answer.questionIndex;
            if (answer.userAnswerFile || answer.userAnswerTest) {
                temp.answred = true;
            } else temp.answred = false;
            checkedItem.push(temp);
        });

        res.json({ user_examEndTime, checkedItem });
    } catch (e) {
        res.json(e);
    }
});
module.exports = rout;