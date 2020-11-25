const rout = require('express').Router();
const auth = require('../../../middelware/auth');
const Exam = require('../../../db/model/examModel');
const Class = require('../../../db/model/classModel');
rout.get('/exams', auth, async(req, res) => {
    try {
        const { user } = req;
        const { classId } = req.body;
        if (!classId) {
            res.status(400).json({ "error": "شناسه ی کلاس مقدار معتبری نیست" });
            return;
        }
        const findClass = await Class.findOne({ _id: classId, owner: user._id });
        if (!findClass) {
            res.status(400).json({ "error": "شما مجاز به دسترسی این کلاس نیستید" });
            return;
        }
        const exams = await Exam.find({ useInClass: classId, owner: user._id });
        if (!findClass) {
            res.status(400).json({ "error": "شما مجاز به دسترسی این کلاس نیستید" });
            return;
        }
        const results = [];
        const uses = ['startDate', 'name', 'endDate', 'examLength'];
        exams.forEach(exam => {
            const item = {};
            uses.forEach(use => {
                if (exam[use]) {
                    item[use] = exam[use];
                }
            });
            if (Object.keys(item).length != 0) {
                results.push(item);
            }
        });
        if (results.length == 0) {
            res.status(400).json({ "error": "مشکلی رخ داده است" });
            return;
        }
        res.json({ "exams": results });
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