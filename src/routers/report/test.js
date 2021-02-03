const rout = require("express").Router();
const User = require('../../db/model/userModel');
const mongoose = require('mongoose');
const auth = require("../../middelware/auth");
const checkClassId = require("../../middelware/class/checkClassId");
const checkClassAccess = require("../../middelware/class/checkClassAccess");
const { baseRoot } = require("../../../constants");
const defaultAvatar = baseRoot + "/public/uploads/avatar/defaultAvatar.png";

rout.get("/class/:classId/report", auth, checkClassId, checkClassAccess, async (req, res, next) => {
    const { examId, userId, classId } = req.query;
    const { user,Class } = req;
    // todo: check the user exist or not
    // find with userId and examId

    // if (!examId || !userId) return res.status(400).json({ "error": 'اجازه دیدن این صفحه را ندارید' });
    try {
        // const id = mongoose.Types.ObjectId(userId);
        // const user = await User.findOne({ _id: id });
        // if (!user) return res.status(400).json({ "error": 'موردی یافت نشد' });
        // , { name: user.firstname + " " + user.lastname }
        console.log(Class);
        await Class.populate('owner', 'firstname lastname').execPopulate();
        const ownerFullname = Class.owner.firstname + " " + Class.owner.lastname;
        await Class.depopulate('owner');

        const reportHeader = {
            userAvatar: (user.avatar) ? user.avatar : defaultAvatar,
            Class: Class.name + " " + Class.classId,
            classAdmin: ownerFullname,
            username: user.username,
            userFirstname: user.firstname,
            userLastname: user.lastname,
            currentDate: new Date().toLocaleString('en-US')
        };
        const report = await Class.generateReport(user);
        res.render("report-template", { report, reportHeader });
    } catch (err) { next(err);}
});
module.exports = rout;