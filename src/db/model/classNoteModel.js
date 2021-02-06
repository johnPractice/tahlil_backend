const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classNoteSchema = Schema({
    title: {
        type: String,
        minlength: [5, 'طول عنوان اعلان کمتر از حد مجاز است'],
        maxlength: [25, 'طول عنوان اعلان بیشتر از حد مجاز است'],
        required: [true, 'عنوان اعلان را وارد نمایید']
    },
    body: {
        type: String,
        minlength: [5, 'طول متن اعلان کمتر از حد مجاز است'],
        maxlength: [120, 'طول متن اعلان بیشتر از حد مجاز است'],
        required: [true, 'متن اعلان را وارد نمایید']
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
classNoteSchema.methods.toJSON = async function () {
    // this refers to class
    await this.populate('creator', 'firstname lastname avatar').execPopulate();

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