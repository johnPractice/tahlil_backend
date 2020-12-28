const mongoose = require('mongoose');
const user_examModel = require('./user-examModel');
const questionModel = require('./questionModel');
const Schema = mongoose.Schema;
const examSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        required: [true, 'نام امتحان باید وارد شود'],
        minlength: [6, 'نام طولانی  تری برای امتحان انتخاب کنید'],
        maxlength: [25, 'طول نام آزمون بیشتر از حد مجاز است']
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
        required: [true, 'طول ازمون باید مشخص شود'],
        validate: [t => t > 0 , 'طول آزمون مقداری نامعتبر است']
        // value as minutes
    },
    questions: [{
        index: {
            type: Number
        },
        question: {
            type: questionModel.schema
        },
        grade: {
            type: Number,
            validate: [g => g >= 0 , 'بارم برخی سوالات مقداری نامعتبر است'],
            required: [true, 'بارم تمامی سوالات را تعیین کنید']
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
examSchema.virtual('attendees', {
    ref: 'UserExam',
    localField: '_id',
    foreignField: 'exam'
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
    const currentDate = (new Date()).getTime();

    if (exam.isModified('startDate')) {
        if (startDate < currentDate) {
            const error = new Error();
            error.error = "زمان شروع آزمون باید زمانی در آینده باشد";
            next(error);
        }
    }
    if (exam.isModified('startDate') || exam.isModified('endDate') || exam.isModified('examLength')) {
        if (
            (startDate >= endDate) ||
            ((endDate - startDate) < (60 * 1000 * exam.examLength))
        ) {
            const error = new Error();
            error.error = "تاریخ یا طول امتحان مقادیر معتبری نیست";
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
    delete userObject.id;
    delete userObject.__v;
    delete userObject.useInClass;
    delete userObject.owner;
    if (userObject.questions)
        userObject.questions.forEach((obj,i) => {
            delete obj._id;
            userObject.questions[i].question = (new questionModel(obj.question)).toJSON();
            delete userObject.questions[i].question.id;
            delete userObject.questions[i].question._id;
        });

    return userObject;
};
examSchema.methods.setQuestions = async function (questions) {

    if (!questions || questions.length == 0)
        throw { message: "Invalid questions", code: 400 };

    const exam = this;

    exam.questions = await Promise.all(
        questions.map(async (obj,i) => {

            let { question, grade } = obj;
            if (!question)
                throw { message: "Invalid question", code: 400 };

            delete question._id;
            delete question.id;
            delete question.public;
            delete question.owner;

            return {
                index: i+1,
                question,
                grade
            };
        })
    );
    await exam.save();
};
examSchema.methods.getQuestions = function (selectProperties) {
    //same as:  exam.questions.select("property1 property2 ... ");

    if (typeof selectProperties != 'string')
        throw { message: "selectProperties should be a string", code: 503 };

    const properties = selectProperties.split(" ");

    const results = this.questions.map(obj => {
        let newQuestion = {};
        properties.forEach(property => {
            if (obj.question[property])
                newQuestion[property] = obj.question[property];
        });
        return {
            index: obj.index,
            question: newQuestion,
            grade: obj.grade
        };
    });

    return results;
};

examSchema.pre('deleteOne', { document: true, query: false }, async function (next) {

    await user_examModel.deleteMany({ exam: this._id });

});

const examModel = mongoose.model('Exam', examSchema);
module.exports = examModel;