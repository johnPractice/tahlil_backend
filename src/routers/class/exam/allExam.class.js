const rout = require('express').Router();
const auth = require('../../../middelware/auth');
const Exam = require('../../../db/model/examModel');
const Class = require('../../../db/model/classModel');
const checkClassId = require('../../../middelware/class/checkClassId');
const checkClassAccess = require('../../../middelware/class/checkClassAccess');
rout.get('/:classId/exams', auth,checkClassId,checkClassAccess, async(req, res) => {
    try {
        const { Class } = req;
        
        const exams = await Exam.find({ useInClass: Class.classId});
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