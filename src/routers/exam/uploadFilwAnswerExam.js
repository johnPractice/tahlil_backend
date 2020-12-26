const rout = require('express').Router();
const auth = require('../../middelware/auth');
const uploadAnswer = require('../../middelware/exam/fileUploadingExam');
const checkExamId = require('../../middelware/exam/checkExamId');
const checkClassAccess = require('../../middelware/class/checkClassAccess');
const checkExamTime = require('../../middelware/exam/checkExamTime');
const checkQuestionIndex = require('../../middelware/exam/checkQuestionIndex');
const questionModel = require('../../db/model/questionModel');
const fileDelete = require('../../functions/deleteFile');
const constants = require('../../../constants');
const { baseRoot } = require('../../../constants');


rout.post('/:examId/questions/:questionIndex/answer', auth, checkExamId, checkClassAccess, checkExamTime, checkQuestionIndex, uploadAnswer.single('answer'), async(req, res) => {
    try {
        const { questionObj, user_exam, user_examEndTime } = req;

        const questionType = questionObj.question.type;
        const questionOptionsLength = questionObj.question.options.length;
        let answerFile = req.fileName;
        let answerText = req.query.answer;
        // TODO: check exam and question to save answer path
        if (!answerFile && !answerText) {
            res.status(400).json({ "error": "مشکلی رخ داده است" });
            return;
        } else if (answerFile && questionType != 'LONGANSWER') {
            await fileDelete(answerFile);
            throw { message: "File upload is for LONGANSWER questions only", code: 400 };
        } else if (answerText) {
            answerText = questionModel.validateAnswer({
                answer: answerText,
                questionType,
                questionOptionsLength
            });
        }
        //add url to path
        answerFile = (constants.buildMode ? constants.urlName : constants.usrAddLocal + "/") + answerFile;
        
        const foundAnswer = user_exam.answers.find(answer => answer.questionIndex == questionObj.index);
        if (!foundAnswer) {
            const newAnswer = {
                questionIndex: questionObj.index,
                answerGrade: null
            };
            if (answerText)
                newAnswer.answerText = answerText;
            if (answerFile)
                newAnswer.answerFile = answerFile;
            user_exam.answers.push(newAnswer);
            var response = {
                answerText: newAnswer.answerText,
                answerFile: newAnswer.answerFile,
                user_examEndTime
            };

        } else {
            if (answerText)
                foundAnswer.answerText = answerText;
            if (answerFile)
                foundAnswer.answerFile = answerFile;
            response = {
                answerText: foundAnswer.answerText,
                answerFile: foundAnswer.answerFile,
                user_examEndTime
            };
        }
        await user_exam.save();
        res.status(200).json(response);

    } catch (err) {
        if (!err.code || err.code >= 600)
            err.code = 503;
        res.status(err.code).json({ error: err.message });
    }
});
rout.delete('/:examId/questions/:questionIndex/answer', auth, checkExamId, checkClassAccess, checkExamTime, checkQuestionIndex, async(req, res) => {
    try {
        const { questionObj, user_exam, user_examEndTime } = req;
        const { deleteFile, deleteText } = req.query;

        const foundAnswer = user_exam.answers.find(answer => answer.questionIndex == questionObj.index);
        if (!foundAnswer)
            throw { message: "جوابی برای حذف وجود ندارد", code: 400 };

        let isDeleted = false;
        if (deleteFile == 'true') {
            if (foundAnswer.answerFile) {
                const filePath = baseRoot + "/public/" + foundAnswer.answerFile.split((constants.buildMode ? constants.urlName : constants.usrAddLocal + "/"))[1];
                await fileDelete(filePath);
            }
            foundAnswer.answerFile = null;
            isDeleted = true;
        }
        if (deleteText == 'true') {
            foundAnswer.answerText = null;
            isDeleted = true;
        }

        await user_exam.save();

        if (!isDeleted)
            throw { message: "deleteText & deleteFile are both false", code: 400 };

        res.status(200).json({ answerText: foundAnswer.answerText, answerFile: foundAnswer.answerFile, user_examEndTime });

    } catch (err) {
        if (!err.code || err.code >= 600)
            err.code = 400;
        res.status(err.code).json({ error: err.message });
    }
});
module.exports = rout;