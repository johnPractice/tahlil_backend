const rout = require('express').Router();
const User = require('../../db/model/userModel');



rout.get('/', (req, res) => {
        res.json('in user');
    })
    // login API


// signup API
rout.post('/signup', async(req, res) => {
    try {
        const info = req.body;
        console.log(info)
        const user = new User();
        const canUse = ['firstname', 'lastname', 'username', 'email', 'password', 'birthday'];
        let check = false;
        canUse.forEach(item => {
            if (info[item]) {
                user[item] = info[item];
                check = true;
            }
        });

        // check fields are exist
        if (!check) {
            res.json({ "error": "check your input" }).status(400);
        } else {
            await user.save();
            const token = await user.genrateAuth();
            res.json({ token, user }).status(200);
        }

    } catch (e) {
        res.json({ e, "error": "some thing wrong " }).status(400);
    }
});





module.exports = rout;