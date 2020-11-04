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
    password: {
        type: String,
        required: true,
        minLength: 6,
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
    delete userObject.password;
    delete userObject.createdAt;
    delete userObject.updatedAt;

    return userObject;
};
// static mehodes
classSchema.statics.findByClassId = async({ id, userId }) => {
    const classes = await classModel.find();
    if (!classes) throw new Error('class not found');
    const result = await classes.filter(x => x.classId.includes(id) && x.owner.toString() != userId.toString());
    if (result.length == 0) return { "message": "nothing found" };

    return result;
};

const classModel = mongoose.model('Class', classSchema);



module.exports = classModel;