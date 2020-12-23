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
rout.put('/:examId/questions/:questionIndex', auth, checkExamId, checkClassAdmin, checkQuestionIndex, async(req, res) => {
    try {
        const { exam, questionObj } = req;
        const info = req.body;
        if (info.grade !== undefined)
            questionObj.grade = info.grade;
        const canUpdate = ['answers', 'imageAnswer'];/*question fields*/
        canUpdate.forEach(property => {
            if (info[property] !== undefined)
                questionObj.question[property] = info[property];
        });
        await exam.save();
        res.sendStatus(200);

    } catch (err) {
        if (err.errors) {
            err.message = err.errors[Object.keys(err.errors)[0]].message;
            err.code = 400;
        }
        else if (!err.code || err.code >= 600)
            err.code = 503;
        res.status(err.code).json({ error: err.message });
    }
});

module.exports = rout;