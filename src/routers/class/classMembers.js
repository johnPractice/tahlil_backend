const rout = require('express').Router();
const auth = require('../../middelware/auth');
const checkClassId = require('../../middelware/class/checkClassId');
const checkClassAdmin = require('../../middelware/class/checkClassAdmin');
const checkClassAccess = require('../../middelware/class/checkClassAccess');

rout.get('/:classId/members', auth, checkClassId,checkClassAccess, async (req, res) => {
    try {
        const { user,Class } = req;
        res.status(200).json({ members: await Class.getMembersList({ forAdmin: user.isAdminOf(Class) }) });

    } catch (err) {
        if (!err.code || err.code >= 600)
            err.code = 400;
        res.status(err.code).json({ error: err.message });
    }
})

rout.delete('/:classId/members/:username', auth, checkClassId, checkClassAdmin, async (req, res) => {
    try {
        const { Class } = req;

        await Class.populate('members', 'username _id').execPopulate();
        const memberToRemove = Class.members.find(member => member.username == req.params.username);
        if (!memberToRemove)
            throw { message: "User is not a member of the class", code: 400 };

        await Class.removeUser(memberToRemove._id);
        res.sendStatus(200);

    } catch (err) {
        if (!err.code || err.code >= 600)
            err.code = 400;
        res.status(err.code).json({ error: err.message });
    }
})

module.exports = rout;