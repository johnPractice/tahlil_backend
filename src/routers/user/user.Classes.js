const rout = require('express').Router();
const auth = require('../../middelware/auth');
const classModel = require('../../db/model/classModel');
const User = require('../../db/model/userModel');

rout.get('/classes', auth, async (req, res) => {
	try {
		const user = req.user;

		const classes = await Promise.all(user.classes.map(async (obj) => {
			let classObject = await classModel.findById(obj.objectId);
			let { firstname, lastname } = (await User.findById(classObject.owner));
			let ownerFullname = firstname + " " + lastname;
			let { name, classId } = classObject;
			return { classId, name, ownerFullname };
		}));

		res.status(200).json({ classes });

	} catch (err) { res.sendStatus(400);}
})

module.exports = rout;