const classModel = require('../db/model/classModel');

const checkClassAdmin = async (req, res, next) => {
    try {
        const { classId } = req.params;
        if (!classId)
            throw { message: "Invalid classId", code: 400 };
        const Class = await classModel.findOne({ classId });
        if (!Class)
            throw { message: "Invalid classId", code: 400 };

        const user = req.user;
        if (!user._id.equals(Class.owner))
            throw { message: "Permission denied", code: 403 };

        req.ownedClass = Class;
        next();

    } catch (err) {
        if (!err.code || err.code >= 600)
            err.code = 400;
        res.status(err.code).json({ error: err.message });
    }
};
module.exports = checkClassAdmin;