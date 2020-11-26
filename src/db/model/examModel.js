const mongoose = require('mongoose');
const ClassModel = require('./classModel');
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

examSchema.pre('save', async function(next) {
    const exam = this;
    const startDate = (new Date(exam.startDate).getTime());
    const endDate = (new Date(exam.endDate).getTime());
    if (exam.isModified('startDate') || exam.isModified('endDate')) {
        if ((startDate > endDate) || (parseFloat(endDate - startDate) < exam.examLength)) {
            const error = new Error();
            error.error = "تاریخ امتحان مقادیر معتبری نیست";
            next(error);
        }
    }
    if (exam.isModified('useInClass')) {
        const findClass = await ClassModel.findOne({ classId: exam.useInClass, owner: exam.owner });
        if (!findClass) {
            const error = new Error();
            error.error = "شما مجاز به دسترسی به این کلاس نیستید";
            next(error);
        }
    }
    next();

});
examSchema.methods.toJSON = function() {
    // this refer to clas
    const userObject = this.toObject();
    delete userObject.createdAt;
    delete userObject.updatedAt;
    delete userObject._id;
    delete userObject.id;
    delete userObject.__v;
    delete userObject.useInClass;
    delete userObject.owner;

    return userObject;
};

const examModel = mongoose.model('Exam', examSchema);
module.exports = examModel;