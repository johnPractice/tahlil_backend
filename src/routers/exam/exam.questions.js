﻿const auth = require('../../middelware/auth');
const checkExamId = require('../../middelware/exam/checkExamId');
const checkClassAccess = require('../../middelware/class/checkClassAccess');
const checkExamTime = require('../../middelware/exam/checkExamTime');
const user_examModel = require('../../db/model/user-examModel');

const rout = require('express').Router();

rout.get('/:examId/questions', auth, checkExamId, checkClassAccess, checkExamTime, async (req, res, next) => {
    try {
        const { exam, Class, user_exam, user_examEndTime } = req;

        const questions = await user_exam.getQuestionsWithUserAnswers();

        res.status(200).json({ name: exam.name, classId: Class.classId, questions, user_examEndTime });

    } catch (err) { next(err); }
});
rout.get('/:examId/questions/review', auth, checkExamId, checkClassAccess, async (req, res, next) => {
    try {
        const { exam, user, Class } = req;
        if ((new Date()) <= exam.endDate)
            throw { message: "زمان آزمون هنوز به اتمام نرسیده است", code: 403 };

        const user_exam = await user_examModel.findOne({ user: user._id, exam: exam._id });
        if (!user_exam)
            throw { message: "شما در این آزمون شرکت نکرده‌اید", code: 403 };

        await user_exam.autoGrade();
        const questions = await user_exam.getQuestionsWithUserAnswers({ getQuestionAnswers: true });

        res.status(200).json({ classId: Class.classId, questions, totalGrade: user_exam.totalGrade });

    } catch (err) { next(err); }
});
module.exports = rout;