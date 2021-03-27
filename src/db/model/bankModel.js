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
    imageQuestion: {
        type: String,
        default: null
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
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
    answers: [{
        answer: {}
    }],
    imageAnswer: {
        type: String,
        default: null
    },
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
    delete bankObject._id;
    delete bankObject.__v;
    delete bankObject.deleted;
    delete bankObject.owner;

    return bankObject;
};
const bankModel = mongoose.model('Bank', bankSchema);
module.exports = bankModel;