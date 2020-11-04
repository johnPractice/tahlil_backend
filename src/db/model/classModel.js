const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = Schema({
    name: {
        type: String,
        minLength: 5,
        required: true,
    },
    description: {
        type: String,
        maxLength: 120
    },
    classId: {
        type: String,
        minLength: 4,
        required: true,
        unique: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String,
        default: null
    },
    members: [{
        member: {
            type: Schema.Types.ObjectId,

        }
    }]
}, {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
});

//methods
// methode for returning json object
classSchema.methods.toJSON = function() {
    // this refer to clas
    const userObject = this.toObject();
    delete userObject.members;
    delete userObject.createdAt;
    delete userObject.updatedAt;

    return userObject;
};

const classModel = mongoose.model('Class', classSchema);



module.exports = classModel;