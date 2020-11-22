const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classNoteSchema = Schema({
    title: {
        type: String,
        minLenght: 5,
        required: [true, 'title is required']
    },
    body: {
        type: String,
        minLenght: 5,
        maxLength: 120,
        required: [true, 'body is required']
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    autoCreate: true,
    autoIndex: true,
    timestamps: true
});

//methods
classNoteSchema.methods.toJSON = function () {
    // this refers to class
    const creatorJSON = this.creator.toJSON();
    const object = this.toObject();
    object.creator = creatorJSON;
    object.classNoteId = object._id;
    delete object._id;
    delete object.id;
    delete object.updatedAt;
    delete object.__v;
    
    return object;
};

const classNoteModel = mongoose.model('ClassNote', classNoteSchema);

module.exports = classNoteModel;