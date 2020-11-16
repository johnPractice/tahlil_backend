const rout = require('express').Router();
const auth = require('../../middelware/auth');

rout.get('/classes', auth, async (req, res) => {
	try {
		const user = req.user;

		await user.populate({ path: 'ownedClasses', select: 'name owner classId', populate: { path: 'owner', select: 'firstname lastname'} } ).execPopulate();
		await user.populate({ path: 'joinedClasses', select: 'name owner classId', populate: { path: 'owner', select: 'firstname lastname'} } ).execPopulate();

		const classes = [].concat(user.ownedClasses, user.joinedClasses);

		for (let i = 0; i < classes.length; i++)
			classes[i] = await classes[i].toListedView();

		res.status(200).json({ classes });

	} catch (err) { console.log(err); res.sendStatus(400);}
})

module.exports = rout;