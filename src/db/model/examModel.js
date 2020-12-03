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
        // value as second
    },
    questions: [{
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
            validate(value) {
                if (value)
                    mongoose.Types.ObjectId(value);

            }
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
    useInClass: {
        type: String,
        required: [true, 'کلاس باید وارد شود']
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
});

// const checkCLass = async({ id, owner }) => {
//     const findClass = await classModel.findOne({ classId: id });
//     if (!findClass) {
//         const error = new Error();
//         error.error = "شما مجاز به دسترسی به این کلاس نیستید";
//         return error;
//     }
//     return findClass;
// };
examSchema.pre('save', async function(next) {
    const exam = this;
    const startDate = (new Date(exam.startDate).getTime());
    const endDate = (new Date(exam.endDate).getTime());

    if (exam.isModified('startDate') || exam.isModified('endDate')) {
        if (
            (startDate > endDate) ||
            (parseFloat(endDate - startDate) < (60 * 1000 * exam.examLength))
        ) {
            const error = new Error();
            error.error = "تاریخ امتحان مقادیر معتبری نیست";
            next(error);
        }
        // else if (new Date(startDate) < nowDate || endDate < nowDate) {
        //     const error = new Error();
        //     error.error = "تاریخ امتحان مقادیر معتبری نیست";
        //     next(error);
        // }
    }

    next();

});
examSchema.methods.toJSON = function() {
    // this refer to clas
    const questions = this.questions;

    const userObject = this.toObject();
    delete userObject.createdAt;
    delete userObject.updatedAt;
    delete userObject.id;
    delete userObject.__v;
    delete userObject.useInClass;
    delete userObject.owner;

    if (questions) {
        for (let i = 0; i < questions.length; i++) {
            delete userObject.questions[i]._id;
            userObject.questions[i].question = questions[i].question.toJSON();
        }
    }

    return userObject;
};

const examModel = mongoose.model('Exam', examSchema);
module.exports = examModel;