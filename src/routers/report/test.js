const rout = require("express").Router();
const auth = require('../../middelware/auth');
rout.get("/generateReport", auth, (req, res) => {
    const { examId, userId, name } = req.query || null;
    const { user } = req;
    if (userId != user._id) return res.status(400).json({ "error": 'اجازه دیدن این صفحه را ندارید' });
    res.render("report-template", { name: name });

});
module.exports = rout;