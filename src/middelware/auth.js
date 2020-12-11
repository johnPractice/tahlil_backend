const jwt = require('jsonwebtoken');
const User = require('../db/model/userModel');
const constants = require('../../constants');

// create auth function for using as middelware to check auth
const auth = async(req, res, next) => {
    try {
        if (!req.header('Authorization') || !req.header('Authorization').includes('Bearer ')) {
            res.status(401).json({ 'error': 'you must be auth' });
        } else {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decoded = await jwt.verify(token, constants.jwtSecret);
            const user = await User.findOne({
                _id: decoded._id,
                'tokens.token': token
            });
            if (!user) throw new Error('not found');

            //for forgot password
            if (req.isForgotPassword===true && decoded.iat) {
                req.tokenExpiryDate = new Date(1000*decoded.iat + 5*60*1000);
                user.tokens = user.tokens.filter((obj) => obj.token != token);
                await user.save();
            }

            req.token = token;
            req.user = user;
            next();
        }

    } catch (e) {
        console.error(e);
        res.status(401).json({ 'error': 'something wrong' });
    }
};

module.exports = auth;