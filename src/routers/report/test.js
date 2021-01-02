const rout = require("express").Router();
const User = require('../../db/model/userModel');
rout.get("/generateReport", async(req, res) => {
    const { examId, userId } = req.query;
    // todo: check the user exist or not
    // find with userId and examId

    if (!examId || !userId) return res.status(400).json({ "error": 'اجازه دیدن این صفحه را ندارید' });
    const user = await User.findOne({ _id: user._id });
    if (!user) return res.status(400).json({ "error": 'موردی یافت نشد' });
    res.render("report-template", { name: user.firstname + " " + user.lastname });

});
module.exports = rout;