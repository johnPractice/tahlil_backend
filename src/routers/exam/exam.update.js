const rout = require('express').Router();
const auth = require('../../middelware/auth');
const Exam = require('../../db/model/examModel');
rout.put('/', auth, async(req, res) => {
    try {
        const canUses = ['name', 'startDate', 'endDate', 'questions', 'examLength', 'useInClass'];
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
            if (info[use]) findExam[use] = info[use];
        });
        await findExam.save();
        res.json({ "message": "ازمون با موفیقت تغییر یافت" });

    } catch (e) {
        console.log(e);
        if (e.message) {
            res.status(400).json({ "error": e.message });
            return;
        }
        res.status(400).json({ "error": "مشکلی رخ داده است" });
    }
});

module.exports = rout;