const express = require('express');
const { userAuth } = require('../middleware/userAuth');
const userRouter = express.Router();
const User = require('../models/User');
const ConnectionRequestModel = require('../models/ConnectionRequest');




//GET all the pending request recived to the logged user
userRouter.get("/user/request/recived", userAuth, async (req, res) => {
    try {
        const loggedUser = req.user;
        // get the request that are intersted ,pending request
        const connectionRequest = await ConnectionRequestModel.find({
            toUserId: loggedUser._id,
            status: "interested",
        });
        res.status(200).json({
            message: "Data fetched successfully",
            data: connectionRequest,
        })


    } catch (err) {
        res.status(400).send("ERROR" + err.message);

    }
});

module.exports = userRouter;


