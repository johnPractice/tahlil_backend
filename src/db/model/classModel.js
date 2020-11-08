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
    //delete userObject.image;

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
classSchema.statics.deleteUserInClass = async({ id, user }) => {
    if (!user) throw new Error("user must be enter");

    const userId = user._id;
    let check = false;
    const classSelect = await classModel.findOne({ classId: id });
    if (!classSelect) throw new Error("class not found");
    for (let i = 0; i < classSelect.members.length; i++) {
        if (classSelect.members[i].member.toString() == userId.toString()) {
            classSelect.members.splice(i, 1);
            check = true;
            break;
        }
    }
    // for check of user not in class
    if (!check) throw new Error("your attempt falid");

    await classSelect.save();
    return {
        "message": "leave ok"
    };



};

const classModel = mongoose.model('Class', classSchema);



module.exports = classModel;