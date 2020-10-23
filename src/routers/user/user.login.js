const rout = require('express').Router();
const User = require('../../db/model/userModel');



// login API
rout.post('/login', async(req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) throw new Error("Wrong Input");

        const user = await User.findByCredentials({ username, password });
        const token = await user.genrateAuth();

        res.json({ user, token });

    } catch (e) { res.json(e).status(400); }

});


// signup API
rout.post('/signup', async(req, res) => {
    try {
        const info = req.body;
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
            res.json({ token, user }).status(201);
        }

    } catch (e) {
        res.json({ e, "error": "some thing wrong " }).status(400);
    }
});





module.exports = rout;