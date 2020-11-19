const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const examSchema = new Schema({
    name: {
        type: String,
        required: [true, 'نام امتحان باید وارد شود'],
        minlength: [6, 'نام طولانی  تری برای امتحان انتخاب کنید']
    },
    startDate: {
        type: Date,
        required: [true, 'تاریخ شروع امتحان باید وارد شود'],
        default: Date.now
    },
    endDate: {
        type: Date,
        required: [true, 'تاریخ پایان امتحان باید وارد شود'],
    },
    examLength: {
        type: Number,
        required: [true, 'زمان ازمون باید مشخص شود'],
    },
    // examLength: {},
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
    }],

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
});

const examModel = mongoose.model('Exam', examSchema);
module.exports = examModel;