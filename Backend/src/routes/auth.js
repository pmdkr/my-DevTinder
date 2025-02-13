
const express = require('express');
const authRouter = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userAuth } = require('../middleware/userAuth.js');
const { validateSignUpData } = require('../utils/validation.js');

//Login API
authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);


    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {

            //create a JWT token
            const token = await user.getJWT();

            //send the token to cookie and send as response to the broser(user)
            res.cookie("token", token);

            res.json({
                message: `Login successful. User :  ${user.firstName}`,
                data: user,
            });

        } else {
            throw new Error("Invalid credentials, Please check your credentials");
        }


    } catch (err) {
        res.status(400).send("ERROR" + err.message);
    }
});



//Signup API
authRouter.post("/signup", async (req, res) => {
    console.log(req.body);
    const { firstName, lastName, email } = req.body;
    const { password } = req.body;
    // const userObj = {
    //     firstName: 'Pramod',
    //     lastName: 'Lohra',
    //     email: 'pramodkrlohra@gmail.com',
    //     password: 'Pramod@123'
    // }




    try {
        // validation of data
        validateSignUpData(req);

        //Enccypt the password
        const passwordHash = await bcrypt.hash(password, 10);


        //creating a new instance of User model
        const user = new User({
            firstName,
            lastName,
            email,
            password: passwordHash
        });
        await user.save();
        res.status(201).send("user added successfuly!");

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);

    }
    //  await user.save();
    // res.send("user signup successfuly!");
});

//Logout API
authRouter.post('/logout', async (req, res) => {

    res.cookie("token",
        null,
        { expires: new Date(Date.now()) }
    )
    res.send("Logout successful")
})

module.exports = authRouter;
