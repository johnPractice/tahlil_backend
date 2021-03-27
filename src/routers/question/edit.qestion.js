const rout = require('express').Router();
const Question = require('../../db/model/questionModel');
const auth = require('../../middelware/auth');
const checkAnswer = require('../../middelware/question/checkAnswer');

rout.put('/', auth, async(req, res, next) => {
    try {
        const info = req.body;
        const user = req.user;
        const question = await Question.findAndOwner({ qId: info.questionId, owner: user._id.toString() });
        const canUses = ['type', 'public', 'question', 'answers', 'options', 'hardness', 'base', 'course', 'chapter', 'imageQuestion', 'imageAnswer'];
        canUses.forEach(use => {
            if (info[use])
                question[use] = info[use];
        });
        await question.save();
        res.json({ 'message': 'question updated', question });

    } catch (err) { next(err); }
});
module.exports = rout;