const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require("../models/User");

const userAuth = async (req, res, next) => {
    try {

        const cookies = req.cookies;
        const { token } = cookies;
        if (!token) {
            return res.status(401).send("Please login");

        }
        const decodedMessage = jwt.verify(token, "DevTinder@321");
        const { _id } = decodedMessage;
        
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User is not present at DB");
        }
        req.user = user;
        next();

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);

    }
}

module.exports = {
    userAuth,
} 