const examModel = require("../../db/model/examModel");
const classModel = require("../../db/model/classModel");

const checkExamId = async (req, res, next) => {
    try {
        const { examId } = req.params;
        const { Class } = req;

        if (!examId)
            throw { message: "Invalid examId", code: 400 };

        if (Class) {
            await Class.populate({
                path: 'exams',
                match: { _id: examId },
            }).execPopulate();

            if (Class.exams.length == 0)
                throw { message: "Invalid examId", code: 400 };

            req.exam = Class.exams[0];

        } else {
            const exam = await examModel.findById(examId);
            if (!exam)
                throw { message: "Invalid examId", code: 400 };
            req.exam = exam;

            const examClass = await classModel.findOne({ classId: exam.useInClass });
            if (!examClass)
                throw { message: "Invalid exam.useInClass", code: 503 };

            req.Class = examClass;
        }
        next();

    } catch (err) {
        if (!err.code || err.code >= 600)
            err.code = 400;
        res.status(err.code).json({ error: err.message });
    }
};
module.exports = checkExamId;