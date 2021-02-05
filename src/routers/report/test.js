const rout = require("express").Router();
const auth = require("../../middelware/auth");
const checkClassId = require("../../middelware/class/checkClassId");
const checkClassAccess = require("../../middelware/class/checkClassAccess");
const { usrAddLocal, buildMode,urlName } = require("../../../constants");
const defaultAvatar = ((buildMode) ? urlName : ("http://" + usrAddLocal + "/")) + "uploads/avatar/defaultAvatar.png";

const queryTokenAuth = async(req, res, next) => {
    const { token } = req.query;
    if (token) {
        newReq = { header: () => 'Bearer ' + token };

        await auth(newReq, res, () => null);
        req.token = newReq.token;
        req.user = newReq.user;
        next();

    } else
        await auth(req, res, next);
}

rout.get("/class/:classId/report", queryTokenAuth, checkClassId, checkClassAccess, async (req, res, next) => {
    try {
        const { user, Class } = req;
        
        await Class.populate('owner', 'firstname lastname').execPopulate();
        const ownerFullname = Class.owner.firstname + " " + Class.owner.lastname;
        await Class.depopulate('owner');
        const currentDate = new Date();
        currentDate.setHours(currentDate.getUTCHours() + 3, currentDate.getUTCMinutes() + 30);
        const reportHeader = {
            userAvatar: (user.avatar) ? ((user.avatar).split("\\").join("/")).split("//").join("/").replace('http:/', 'http://') : defaultAvatar,
            Class: Class.name + " " + Class.classId,
            classAdmin: ownerFullname,
            username: user.username,
            userFirstname: user.firstname,
            userLastname: user.lastname,
            currentDate: currentDate.toLocaleString('en-US')
        };
        const report = await Class.generateReport(user);

        res.render("report-template", { report, reportHeader });

    } catch (err) { next(err);}
});
module.exports = rout;