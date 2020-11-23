const rout = require('express').Router();
const auth = require('../../middelware/auth');
const checkClassId = require('../../middelware/class/checkClassId');
const checkClassAccess = require('../../middelware/class/checkClassAccess');

rout.get('/:classId', auth, checkClassId,checkClassAccess, async (req, res) => {
    try {
        const { Class } = req;
        await Class.populate('owner', 'firstname lastname email avatar').execPopulate();

        const ClassObject = Class.toJSON();
        ClassObject.admin = Class.owner;

        res.status(200).json({ Class: ClassObject });

    } catch (err) { res.sendStatus(503); }
});
module.exports = rout;