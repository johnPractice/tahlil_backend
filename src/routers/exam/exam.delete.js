const rout = require('express').Router();
const auth = require('../../middelware/auth');
const checkExamId = require('../../middelware/exam/checkExamId');
const checkClassAdmin = require('../../middelware/class/checkClassAdmin');
rout.delete('/:examId', auth,checkExamId,checkClassAdmin, async(req, res) => {
    try {
        const examToDelete = req.exam;

        await examToDelete.deleteOne();

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