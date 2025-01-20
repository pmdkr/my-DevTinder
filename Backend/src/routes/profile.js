const express = require('express');
const profileRouter = express.Router();
const {userAuth}=require('../middleware/userAuth.js');

//GET user profile using cookie stored after login
profileRouter.get("/profile", userAuth, async (req, res) => {

    try {
        const user = req.user;
        if (!user) {
            console.log("user is not found at DB");
        }
        res.status(200).send("Reading the cookie" + ' ' + user.firstName);

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);

    }
});

module.exports = profileRouter;