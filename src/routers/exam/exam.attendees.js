const auth = require('../../middelware/auth');
const checkExamId = require('../../middelware/exam/checkExamId');
const checkClassAdmin = require('../../middelware/class/checkClassAdmin');
const checkQuestionIndex = require('../../middelware/exam/checkQuestionIndex');

const rout = require('express').Router();

rout.get('/:examId/attendees', auth, checkExamId, checkClassAdmin, async (req, res, next) => {
    try {
        const { exam } = req;
        await exam.populate({
            path: 'attendees',
            populate: {
                path: 'user',
                select: 'username firstname lastname email avatar'
            }
        }).execPopulate();

        //might move to kaarnaame
        if ((new Date()) >= exam.endDate)
            exam.attendees.forEach(user_exam => {
                if (user_exam.isAutoGraded === false)
                    user_exam.autoGrade();
            });

        res.status(200).json({
            attendees: exam.attendees.map(obj => {
                let newObj = obj.toObject().user;
                newObj.totalGrade = obj.totalGrade;
                delete newObj.id;
                delete newObj._id;
                return newObj;
            })
        });

    } catch (err) { next(err); }
});
rout.delete('/:examId/attendees/:username', auth, checkExamId, checkClassAdmin, async (req, res, next) => {
    try {
        const { exam } = req;
        await exam.populate({
            path: 'attendees',
            select: 'user',
            populate: {
                path: 'user',
                select: 'username'
            }
        }).execPopulate();
        const user_exam = await exam.attendees.find(attendee => attendee.user.username == req.params.username);
        if (!user_exam)
            throw { message: "Username is not in the exam attendees list", code: 400 };

        await user_exam.deleteOne();
        res.sendStatus(200);

    } catch (err) { next(err); }
});
rout.get('/:examId/attendees/:username', auth, checkExamId, checkClassAdmin, async (req, res, next) => {
    try {
        const { exam, user } = req;
        const { reAutoGrade } = req.query;

        if ((new Date()) <= exam.endDate)
            throw { message: "زمان آزمون هنوز به اتمام نرسیده است", code: 403 };

        await exam.populate({
            path: 'attendees',
            populate: {
                path: 'user',
                select: 'username firstname lastname'
            }
        }).execPopulate();
        const user_exam = await exam.attendees.find(attendee => attendee.user.username == req.params.username);
        if (!user_exam)
            throw { message: "Username is not in the exam attendees list", code: 400 };

        if(reAutoGrade=='true' || user_exam.isAutoGraded===false)
            await user_exam.autoGrade({reAutoGrade: true});

        const questions = await user_exam.getQuestionsWithUserAnswers({ getQuestionAnswers: true });

        res.status(200).json({
            userFirstname: user_exam.user.firstname,
            userLastname: user_exam.user.lastname,
            examName: exam.name,
            questions,
            totalGrade: user_exam.totalGrade
        });

    } catch (err) { next(err); }
});
rout.put('/:examId/attendees/:username', auth, checkExamId, checkClassAdmin, async (req, res, next) => {
    try {
        const { exam } = req;
        const { answerGrades, totalGrade } = req.body;

        await exam.populate({
            path: 'attendees',
            populate: {
                path: 'user',
                select: 'username'
            }
        }).execPopulate();
        const user_exam = await exam.attendees.find(attendee => attendee.user.username == req.params.username);
        if (!user_exam)
            throw { message: "Username is not in the exam attendees list", code: 400 };

        if (answerGrades) {
            if (answerGrades.length != exam.questions.length)
                throw { message: "answerGrades must have the same length as exam questions", code: 400 };
            await answerGrades.forEach((answerGrade, index) => user_exam.setAnswerGrade(index + 1, answerGrade));
        }
        if (totalGrade === null)
            throw { message: "totalGrade can not be set to null", code: 400 };
        else if (totalGrade !== undefined)
            user_exam.totalGrade = totalGrade;

        await user_exam.save();
        res.sendStatus(200);

    } catch (err) { next(err); }
});
module.exports = rout;