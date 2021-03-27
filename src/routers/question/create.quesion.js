const rout = require('express').Router();
const Question = require('../../db/model/questionModel');
const auth = require('../../middelware/auth');
const checkAnswer = require('../../middelware/question/checkAnswer');


rout.post('/', auth, async(req, res, next) => {
    try {
        const user = req.user;
        const info = req.body;
        const canUses = ['type', 'public', 'question', 'answers', 'options', 'hardness', 'base', 'course', 'chapter', 'imageQuestion', 'imageAnswer'];
        if (Object.keys(info).length == 0) {
            res.status(400).json({ "error": "must enter somthnig" });
            return;
        }
        const question = new Question();
        canUses.forEach(cansUse => {
            if (info[cansUse]) question[cansUse] = info[cansUse];
        });
        question.owner = user._id;
        await question.save();
        res.status(200).json({ questionId: question._id });

    } catch (err) { next(err); }
});

module.exports = rout;