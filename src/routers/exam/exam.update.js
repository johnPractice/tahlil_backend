const rout = require('express').Router();
const auth = require('../../middelware/auth');
const Exam = require('../../db/model/examModel');
const checkExamId = require('../../middelware/exam/checkExamId');
const checkClassAdmin = require('../../middelware/class/checkClassAdmin');
const checkQuestionIndex = require('../../middelware/exam/checkQuestionIndex');
rout.put('/', auth, async(req, res) => {
    try {
        const canUses = ['name', 'startDate', 'endDate', 'examLength', 'useInClass'];
        const info = req.body;
        if (Object.keys(info).length == 0) {
            res.status(400).json({ "error": "برای ساخت آزمون فیلد های مربوطه را وارد کنید" });
            return;
        }
        if (!info.examId) {
            res.status(400).json({ "error": "شناسه ی آزمون باید مقدار معتبری وارد شود" });
            return;
        }
        const findExam = await Exam.findOne({ _id: info.examId });
        if (!findExam) {
            res.status(400).json({ "error": "شناسه ی آزمون باید مقدار معتبری وارد شود" });
            return;
        }
        canUses.forEach(use => {
            if (info[use] !== undefined && findExam[use] != info[use])
                findExam[use] = info[use];
        });
        if (info.questions) {
            if ((new Date()) >= findExam.startDate)
                throw { message: "شما قادر به تغییر سوالات پس از برگزاری آزمون نیستید" };
            await findExam.setQuestions(info.questions);
        }
        await findExam.save();
        res.json({ "message": "ازمون با موفقیت تغییر یافت" });

    }//} catch (e) {
    //    console.log(e);
    //    if (e.message) {
    //        res.status(400).json({ "error": e.message });
    //        return;
    //    }
    //    res.status(400).json({ "error": "مشکلی رخ داده است" });
    //}
    catch (e) {
        console.log(e);
        if (e && e.errors) {
            const keys = Object.keys(e.errors);
            if (e.message) {
                if (Object.keys(e.errors).length > 1) {
                    const errors = [];
                    keys.forEach(key => {
                        const error = {};
                        error.error = e.errors[key].message;
                        errors.push(error);
                    });
                    res.status(400).json({ "error": errors });
                } else {
                    for (let i = 0; i < keys.length; i++) {
                        if (e.errors[keys[i]].message) {
                            res.status(400).json({ "error": e.errors[keys[i]].message });
                            return;
                        }
                    }
                    res.status(400).json({ "error": 'مشکلی رخ داده است' });
                }
            }
        } else {
            if (!e.code || e.code >= 600)
                e.code = 503;
            res.status(e.code).json({ error: e.message });
        }
    }
});
//for editing some exam questions property after exam start
rout.put('/:examId/questions/:questionIndex', auth, checkExamId, checkClassAdmin, checkQuestionIndex, async(req, res, next) => {
    try {
        const { exam, questionObj } = req;
        const questionIndex = questionObj.index;
        const info = req.body;
        let reAutoGradable = false;

        if (info.grade !== undefined) {
            const gradeRatio = info.grade / questionObj.grade;
            questionObj.grade = info.grade;
            await exam.populate('attendees', 'answers').execPopulate();
            exam.attendees.forEach(async(user_exam) => {
                let answerGrade = user_exam.getAnswerGrade(questionIndex);
                if (answerGrade) {
                    await user_exam.setAnswerGrade(questionIndex, answerGrade * gradeRatio);
                    await user_exam.save();
                }
            })
        }
        if (info.answers !== undefined) {
            questionObj.question.answers = info.answers;
            reAutoGradable = true;
        }
        if (info.imageAnswer !== undefined)
            questionObj.question.imageAnswer = info.imageAnswer;
        await exam.save();

        if (reAutoGradable === true)
            if (questionObj.question.type == 'TEST' || questionObj.question.type == 'MULTICHOISE' || questionObj.question.type == 'SHORTANSWER') {
                await exam.populate('attendees').execPopulate();
                await exam.attendees.forEach(async (user_exam) => {
                    user_exam.totalGrade -= await user_exam.getAnswerGrade(req.params.questionIndex);
                    await user_exam.setAnswerGrade(req.params.questionIndex, null);
                    await user_exam.autoGrade();
                    user_exam.totalGrade += await user_exam.getAnswerGrade(req.params.questionIndex);
                    await user_exam.save();
                });
            }
        res.sendStatus(200);

    } catch (err) { next(err); }
});

module.exports = rout;