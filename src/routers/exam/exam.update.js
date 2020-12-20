const rout = require('express').Router();
const auth = require('../../middelware/auth');
const Exam = require('../../db/model/examModel');
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
            if (info[use] != undefined && findExam[use] != info[use])
                findExam[use] = info[use];
        });
        if (info.questions)
            await findExam.setQuestions(info.questions);
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
            res.status(400).json(e);

        }
    }
});

module.exports = rout;