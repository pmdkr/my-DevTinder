const express = require('express');
const { userAuth } = require('../middleware/userAuth');
const userRouter = express.Router();
const User = require('../models/User');
const ConnectionRequestModel = require('../models/ConnectionRequest');

const USER_DATA_SAFE = "firstName lastName gender age about photoURL skills";


//GET all the pending request recived to the logged user
userRouter.get("/user/request/recived", userAuth, async (req, res) => {
    try {
        const loggedUser = req.user;
        // get the request that are intersted ,pending request
        const connectionRequest = await ConnectionRequestModel.find({
            toUserId: loggedUser._id,
            status: "interested",
        }).populate("fromUserId", USER_DATA_SAFE);
        res.status(200).json({
            message: "Data fetched successfully",
            data: connectionRequest,
        })


    } catch (err) {
        res.status(400).send("ERROR" + err.message);

    }
});

//GET all connections of logged user
userRouter.get('/user/request/connctions', userAuth, async (req, res) => {

    try {
        const loggedUser = req.user;
        const connectionRequest = await ConnectionRequestModel.find({
            $or: [
                { toUserId: loggedUser._id, status: "accepted" },
                { fromUserId: loggedUser._id, status: "accepted" }
            ]

        })
            .populate("fromUserId", USER_DATA_SAFE)
            .populate("toUserId", USER_DATA_SAFE);

        const data = connectionRequest.map((row) => {
            if (row.fromUserId._id.toString() === row.toUserId._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        })
        res.json({ data });


    } catch (err) {
        res.status(400).send("ERROR" + err.message);
    }
});

module.exports = userRouter;


