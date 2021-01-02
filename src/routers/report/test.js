const rout = require("express").Router();
const User = require('../../db/model/userModel');
const mongoose = require('mongoose');
rout.get("/generateReport", async(req, res) => {
    const { examId, userId } = req.query;
    // todo: check the user exist or not
    // find with userId and examId

    if (!examId || !userId) return res.status(400).json({ "error": 'اجازه دیدن این صفحه را ندارید' });
    try {
        const id = mongoose.Types.ObjectId(userId);
        const user = await User.findOne({ _id: id });
        if (!user) return res.status(400).json({ "error": 'موردی یافت نشد' });
        res.render("report-template", { name: user.firstname + " " + user.lastname });
    } catch (e) {
        return res.status(400).json({ "error": "مشکلی رخ داده است" });
    }
});
module.exports = rout;