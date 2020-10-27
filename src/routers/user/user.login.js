const rout = require('express').Router();
const User = require('../../db/model/userModel');



// login API
rout.post('/login', async(req, res) => {
    try {
        const {
            username,
            password
        } = req.body;
        if (!username || !password) throw new Error("Wrong Input");

        const user = await User.findByCredentials({
            username,
            password
        });
        const token = await user.genrateAuth();

        res.status(200)
            .json({
                user,
                token
            });

    } catch (err) {
        res.status(400).json({err});
    }

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
            res.status(400)
                .json({
                    "error": "check your input"
                });
        } else {
            await user.save();
            const token = await user.genrateAuth();
            res.status(201).json({
                token,
                user
            });
        }

    } catch (e) {
        res.status(400)
            .json({
                e,
                "error": "some thing wrong "
            });
    }
});





module.exports = rout;