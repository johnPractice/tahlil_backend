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
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
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
    delete userObject._id;
    delete userObject.__v;
    delete userObject.owner;

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
classSchema.methods.removeUser = async function(userId) {
    if (!userId)
        throw { message: "userId is required", code: 400 };

    const Class = this;

    let userIndexInMembers = Class.members.indexOf(userId);
    if (userIndexInMembers == -1)
        throw { message: "User is not a member of the class", code: 400 };

    Class.members.remove(userId);

    userIndexInMembers = Class.members.indexOf(userId);
    if (userIndexInMembers != -1)
        throw { message: "Failed", code: 503 };

    await Class.save();
};

const classModel = mongoose.model('Class', classSchema);



module.exports = classModel;