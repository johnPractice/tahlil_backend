const rout = require('express').Router();
const userExamModel = require('../../db/model/user-examModel');
const auth = require('../../middelware/auth');
const uploadAnswer = require('../../middelware/exam/fileUploadingExam');
const checkExamId = require('../../middelware/exam/checkExamId');
const checkQuestionId = require('../../middelware/exam/checkQuestionId');
const checkClassAccess = require('../../middelware/class/checkClassAccess');
const checkExamTime = require('../../middelware/exam/checkExamTime');


rout.post('/:examId/questions/:questionId/:answer', auth, checkExamId, checkClassAccess, checkExamTime, checkQuestionId, uploadAnswer.single('answer'), async(req, res) => {
    try {
        const answer = (req.fileName) || req.params.answer;
        // TODO: check exam and question to save answer path
        if (!answer) {
            res.status(400).json({ "error": "مشکلی رخ داده است" });
            return;
        }
        ///////////////////////////////////////////////////////////////
        const { user, Class, exam, question, user_examEndTime } = req;
        ///////////////////////////////////////////////////////////////
        const userExam = await (await userExamModel.findOne({ user: user._id, exam: exam._id }))
            .select('answers')
            .where('question')
            .equals(question._id);
        if (!user_examEndTime) {
            const newAnswer = await (await userExamModel.findOne({ user: user._id, exam: exam._id }));
            const newUserAnswer = { question: question._id, answer: answer };
            newAnswer.answers.push(newUserAnswer);
            await newUserAnswer.save();
        } else {
            userExam.answers.answer = answer;
            await userExam.save();

        }
        // .populate({ path: 'answers.question' });

        res.status(200).json({ "message": "ok", answer, user_examEndTime });

    } catch (e) {
        res.json(e);
    }
});
module.exports = rout;