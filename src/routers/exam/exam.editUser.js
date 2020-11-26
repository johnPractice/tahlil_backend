const rout = require('express').Router();
const auth = require('../../middelware/auth');
const Exam = require('../../db/model/examModel');
rout.put('/member', auth, async(req, res) => {
    try {
        const { students, examId } = req.body;
        if (!examId) {
            res.status(400).json({ "error": "لطفا مقادیر اجباری را وارد کنید" });
            return;
        }
        const exam = await Exam.findOne({ _id: examId });
        if (!exam) {
            res.status(400).json({ "error": "امتحانی یافت نشد دوباره سعی کنید" });
            return;
        }
        exam.members = students;
        await exam.save();
        res.json({ "message": "تغییرات با موفقیت اعمال شد" });
    } catch (e) {
        // console.log(e);
        if (e.message) {
            res.status(400).json({ "error": e.message });
            return;
        }
        res.status(400).json({ "error": "مشکلی رخ داده است" });
    }
});

module.exports = rout;