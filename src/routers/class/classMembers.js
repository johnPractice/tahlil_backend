const rout = require('express').Router();
const auth = require('../../middelware/auth');
const checkClassId = require('../../middelware/class/checkClassId');

rout.get('/:classId/members', auth, checkClassId, async (req, res) => {
    try {
        const { user, Class } = req;

        if (!user.isMemberOf(Class) && !user.isAdminOf(Class))
            throw { message: "Permission Denied", code: 403 };

        await Class.populate('members', 'username firstname lastname').execPopulate();
        res.status(200).json({ members: Class.members });

    } catch (err) {
        if (!err.code || err.code >= 600)
            err.code = 400;
        res.status(err.code).json({ error: err.message });
    }
})
module.exports = rout;