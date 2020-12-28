const auth = require('../../middelware/auth');
const checkExamId = require('../../middelware/exam/checkExamId');
const checkClassAdmin = require('../../middelware/class/checkClassAdmin');

const rout = require('express').Router();

rout.get('/:examId/attendees', auth, checkExamId, checkClassAdmin, async (req, res, next) => {
    try {
        const { exam } = req;
        await exam.populate({
            path: 'attendees',
            select: 'user',
            populate: {
                path: 'user',
                select: 'username firstname lastname email avatar'
            }
        }).execPopulate();
        res.status(200).json({ attendees: exam.attendees.map(obj=>obj.user) });

    } catch (err) { next(err); }
});
rout.delete('/:examId/attendees/:username', auth, checkExamId, checkClassAdmin, async (req, res, next) => {
    try {
        const { exam } = req;
        await exam.populate({
            path: 'attendees',
            select: 'user',
            populate: {
                path: 'user',
                select: 'username'
            }
        }).execPopulate();
        const user_exam = await exam.attendees.find(attendee => attendee.user.username == req.params.username);
        if (!user_exam)
            throw { message: "Username is not in the exam attendees list", code: 400 };

        await user_exam.deleteOne();
        res.sendStatus(200);

    } catch (err) { next(err); }
});
module.exports = rout;