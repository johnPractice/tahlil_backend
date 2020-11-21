const rout = require('express').Router();
const Exam = require('../../db/model/examModel');
const auth = require('../../middelware/auth');
rout.get('/', auth, async(req, res) => {
    try {
        const { user } = req;
        const exam = await Exam.find({ owner: user._id }).populate({ path: 'questions.question' });
        if (!exam || exam.length == 0) {
            res.status(400).json({ "error": "مشکلی پیش امده است لصفا ازمون خود را دوباره چک نمایید" });
            return;
        }
        res.json(exam);
    } catch (e) {
        console.log(e);
        if (e.message) {
            res.json({ "error": e.message });
            return;
        }
        // res.json({ "error": e });
        res.json({ "error": "مشکلی رخ داده است" });
    }
});

module.exports = rout;