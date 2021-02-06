const user_examModel = require('../../db/model/user-examModel');

const checkExamTime = async (req, res, next) => {
    try {
        const currentTime = new Date();
        const { user, exam } = req;

        if (currentTime < exam.startDate)
            throw { message: "زمان شروع آزمون فرا نرسیده است", code: 403 };
        if (currentTime >= exam.endDate)
            throw { message: "زمان آزمون به پایان رسیده است", code: 403 };

        const user_exam = await user_examModel.findOne({ user: user._id, exam: exam._id });
        if (user_exam) {
            //user started the exam before
            const endTime = await user_exam.endTime;
            req.user_examEndTime = endTime;
            req.user_exam = user_exam;

        } else {
            //user hasn't started the exam
            const newUser_exam = new user_examModel({
                user: user._id,
                exam: exam._id
            });
            await newUser_exam.save();
            req.user_examEndTime = await newUser_exam.endTime;
            req.user_exam = newUser_exam;
        }
        if (currentTime >= req.user_examEndTime)
            throw { message: "زمان شما در آزمون به پایان رسیده است", code: 403 };
        next();
    } catch (err) {
        if (!err.code || err.code >= 600)
            err.code = 400;
        res.status(err.code).json({ error: err.message });
    }
}
module.exports = checkExamTime;