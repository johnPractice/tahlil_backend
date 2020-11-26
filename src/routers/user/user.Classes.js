const rout = require('express').Router();
const auth = require('../../middelware/auth');

rout.get('/classes', auth, async (req, res) => {
	try {
		const user = req.user;

		await user.populate({ path: 'ownedClasses', select: 'name owner classId', populate: { path: 'owner', select: 'firstname lastname'} } ).execPopulate();
		await user.populate({ path: 'joinedClasses', select: 'name owner classId', populate: { path: 'owner', select: 'firstname lastname'} } ).execPopulate();

		const { ownedClasses, joinedClasses } = user;

		let length = ownedClasses.length;
		for (let i = 0; i < length ; i++)
			ownedClasses[i] = await ownedClasses[i].toListedView(true);

		length = joinedClasses.length;
		for (let i = 0; i < length ; i++)
			joinedClasses[i] = await joinedClasses[i].toListedView(false);

		const classes = [].concat(ownedClasses, joinedClasses);

		res.status(200).json({ classes });

	} catch (err) { console.log(err); res.sendStatus(400);}
})

module.exports = rout;