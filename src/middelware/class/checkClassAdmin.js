const checkClassAdmin = async (req, res, next) => {
    try {
        const user = req.user;
        const Class = req.Class;

        if (!user.isAdminOf(Class))
            throw { message: "Permission Denied", code: 403 };

        next();

    } catch (err) {
        if (!err.code || err.code >= 600)
            err.code = 400;
        res.status(err.code).json({ error: err.message });
    }
};
module.exports = checkClassAdmin;