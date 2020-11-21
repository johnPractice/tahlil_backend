const rout = require('express').Router();
const Exam = require('../../db/model/examModel');
const auth = require('../../middelware/auth');
rout.post('/', auth, async(req, res) => {
    try {
        const { user } = req;
        const canUses = ['name', 'startDate', 'endDate', 'questions', 'examLength'];
        const info = req.body;
        if (!info.questions || info.questions.length == 0) res.status(400).json({ 'error': 'لطفا سوالی را برای ازمون انتخاب کنید' });
        if (Object.keys(info).length == 0) {
            res.status(400).json({ "error": "برای ساخت آزمون فیلد های مربوطه را وارد کنید" });
            return;
        }
        const newExam = new Exam();
        canUses.forEach(use => {
            newExam[use] = info[use];
        });
        newExam.owner = user._id;
        await newExam.save();

        res.json(newExam);
    } catch (e) {
        const keys = Object.keys(e.errors);
        // console.log(e);
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
        } else {
            res.status(400).json({ "error": 'مشکلی رخ داده است' });

        }
    }
});

module.exports = rout;