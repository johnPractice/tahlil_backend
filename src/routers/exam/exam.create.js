const rout = require('express').Router();
const Exam = require('../../db/model/examModel');
const auth = require('../../middelware/auth');
const mongoose = require('mongoose');
rout.post('/', auth, async(req, res) => {
    try {
        const canUses = ['name', 'startDate', 'endDate'];
        const info = req.body;
        if (!info.questions) res.status(400).json({ 'error': 'you should enter some thing for questions to create exam' });
        if (Object.keys(info).length == 0) {
            res.status(400).json({ "error": "must enter somthnig" });
            return;
        }
        const newExam = new Exam();
        canUses.forEach(use => {
            newExam[use] = info[use];
        });
        newExam.questions = [];
        info.questions.forEach(question => {
            newExam.questions.push(mongoose.Types.ObjectId(question));
        });

        await newExam.save();

        res.json(newExam);
    } catch (e) {
        // console.log(e);
        if (e.message) {
            if (Object.keys(e.errors).length > 1) {
                const errors = [];
                const keys = Object.keys(e.errors);
                keys.forEach(key => {
                    const error = {};
                    error.error = e.errors[key].message;
                    errors.push(error);
                });
                res.status(400).json({ "error": errors });
            } else {
                res.status(400).json({ "error": e.message });
            }
        } else {
            res.status(400).json({ "error": e });

        }
    }
});

module.exports = rout;