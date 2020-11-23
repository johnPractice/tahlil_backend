const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const examSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
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
    questions: [{
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
            validate(value) {
                if (value)
                    mongoose.Types.ObjectId(value);

            }
        },
        grade: {
            type: Number
        }
    }],
    members: [{
        member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        grade: {
            type: Number,
            default: null
        }
    }],
    classesOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: [true, 'کلاس باید وارد شود']
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
});

const examModel = mongoose.model('Exam', examSchema);
module.exports = examModel;