const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { nanoid } = require('nanoid');

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
        default: () => nanoid(6),
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
    }],
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'ClassNote'
    }],
    exams: [{
        exam: {
            type: Schema.Types.ObjectId,
            ref: 'Exam'
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
    delete userObject._id;
    delete userObject.id;
    delete userObject.__v;
    delete userObject.owner;
    delete userObject.notes;

    return userObject;
};
classSchema.methods.toListedView = async function(isOwned) {
        //returns an object with selected properties
        //to show in the list of user's classes
        if (!this.populated('owner'))
            await this.populate('owner', 'firstname lastname').execPopulate();

        let { firstname, lastname } = this.owner;
        const listedView = this.toJSON();
        delete listedView.description;
        listedView.ownerFullname = firstname + " " + lastname;

        if (typeof isOwned === "boolean")
            listedView.isOwned = isOwned;
        else
            throw new Error("isOwned must be of type boolean")

        return listedView;
    }
    // static mehodes
classSchema.statics.findByClassId = async({ id, userId }) => {
    const classes = await classModel.find();
    if (!classes) throw new Error('class not found');
    const result = await classes.filter(x => x.classId.includes(id) && x.owner.toString() != userId.toString());
    if (result.length == 0) return { "message": "nothing found" };

    return result;
};
classSchema.methods.removeUser = async function(userId) {
    //removes a user from the class
    if (!userId)
        throw { message: "userId is required", code: 400 };

    const Class = this;
    if (Class.populated('members'))
        await Class.depopulate('members');

    let userIndexInMembers = Class.members.indexOf(userId);
    if (userIndexInMembers == -1)
        throw { message: "User is not a member of the class", code: 400 };

    Class.members.remove(userId);

    userIndexInMembers = Class.members.indexOf(userId);
    if (userIndexInMembers != -1)
        throw { message: "Failed", code: 503 };

    await Class.save();
};
classSchema.methods.getMembersList = async function({ forAdmin }) {
    //gets members of class to show in class page
    if (forAdmin === true)
        await this.populate('members', 'username firstname lastname email avatar').execPopulate();
    else
        await this.populate('members', 'firstname lastname avatar').execPopulate();

    return this.members;
};

const classModel = mongoose.model('Class', classSchema);



module.exports = classModel;