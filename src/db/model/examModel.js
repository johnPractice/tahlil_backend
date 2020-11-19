const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const examSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 6,
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true,
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