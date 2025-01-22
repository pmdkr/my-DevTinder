const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../middleware/userAuth.js');
const {validateProfileUpdateData}=require('../utils/validation.js');

//GET user profile using cookie stored after login
profileRouter.get("/profile/view", userAuth, async (req, res) => {

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


// PATCH update API for user
profileRouter.patch('/profile/edit',userAuth, async (req, res) => {


    try {

        if (!validateProfileUpdateData(req)) {
            throw new Error("Invalid Profle request");
        }
        const loggedUser = req.user;
        Object.keys(req.body).forEach((key) => (loggedUser[key] = req.body[key]));
        await loggedUser.save();
        
        res.json({
            message:`${loggedUser.firstName} ,your profile Updated successfuly.`,
            data:loggedUser,

        })

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);

    }

})

module.exports = profileRouter;