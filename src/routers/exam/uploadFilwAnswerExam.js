const rout = require('express').Router();
const auth = require('../../middelware/auth');
const uploadAnswer = require('../../middelware/exam/fileUploadingExam');
const checkExamId = require('../../middelware/exam/checkExamId');
const checkQuestionId = require('../../middelware/exam/checkQuestionId');
const checkClassAccess = require('../../middelware/class/checkClassAccess');
const checkExamTime = require('../../middelware/exam/checkExamTime');

rout.post('/:examId/questions/:questionId', auth, checkExamId, checkClassAccess, checkExamTime, checkQuestionId, uploadAnswer.single('answer'), async(req, res) => {
    try {
        ///////////////////////////////////////////////////////////////
        const { user, Class, exam, question, user_examEndTime } = req;
        ///////////////////////////////////////////////////////////////

        const filePath = (req.fileName);
        // TODO: check exam and question to save answer path
        if (!filePath) {
            res.status(400).json({ "error": "مشکلی رخ داده است" });
            return;
        }
        res.status(200).json({ "message": "ok", filePath, user_examEndTime });
    } catch (e) {
        res.json(e);
    }
});
module.exports = rout;