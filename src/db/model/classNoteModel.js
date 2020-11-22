const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classNoteSchema = Schema({
    title: {
        type: String,
        minLenght: 5,
        required: true
    },
    body: {
        type: String,
        minLenght: 5,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    autoCreate: true,
    autoIndex: true,
    timestamps: true
});

//methods
classNoteSchema.methods.toJSON = function () {
    // this refer to clas
    this.populate('creator', 'firstname lastname avatar').execPopulate();

    const userObject = this.toObject();
    delete userObject.createdAt;
    delete userObject.__v;

    return userObject;
};

const classNoteModel = mongoose.model('ClassNote', classNoteSchema);

module.exports = classNoteModel;