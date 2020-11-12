const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bankSchema = Schema({
    question: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['TEST', 'MULTICHOISE', 'LONGANSWER', 'SHORTANSWER']
    },
    options: [{
        option: {
            type: String,
            required: true
        }
    }],
    qId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Question"
    },
    course: {
        type: String,
        enum: ['MATH', 'PHYSIC', 'CHEMISTRY', 'BIOLOGY']
    },
    hardness: {
        type: String,
        required: true,
        enum: ['LOW', 'MEDIUM', 'HARD']
    },
    chapter: {
        type: String,
        required: true,
        enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    },
    answer: {},
    base: {
        type: String,
        enum: ['10', '11', '12'],
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    }

});

//methodes 
bankSchema.methods.toJSON = function() {
    const bank = this;
    const bankObject = bank.toObject();
    delete bankObject.qId;
    delete bankObject.course;
    delete bankObject._id;
    delete bankObject.__v;


    return bankObject;
};
const bankModel = mongoose.model('Bank', bankSchema);
module.exports = bankModel;