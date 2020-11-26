const rout = require('express').Router();
const Exam = require('../../db/model/examModel');
const auth = require('../../middelware/auth');
rout.delete('/:examId', auth, async(req, res) => {
    try {
        const examId = req.params.examId;
        const { user } = req;
        if (!examId) {
            res.status(400).json({ "error": "شناسه ی امتحان باید مقدار صحیحی وارد شود" });
            return;
        }
        const examDelete = await Exam.findOneAndDelete({ _id: examId, owner: user._id });
        if (!examDelete) {
            res.status(400).json({ "error": "مشکلی رخ داده است دوباره تلاش کنید" });
            return;
        }
        res.json({ "message": "امتحان با موفقیت حذف شد" });
    } catch (e) {
        console.log(e);
        if (e.message) {
            res.status(400).json({ "error": e.message });

        } else {
            res.status(400).json({ "error": "دوباره سعی کنید " });

        }
    }
});

module.exports = rout;