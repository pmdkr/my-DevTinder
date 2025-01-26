const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middleware/userAuth.js');
const ConnectionRequest = require('../models/ConnectionRequest.js');
const User = require('../models/User.js');


//POST send a connection request to other user
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        //Validate the status of request
        const allowedStatus = ["interested", "ignored"];
        if (!allowedStatus.includes(status)) {
            return res.json({
                message: " Connection request status is invalid",
                status,

            })
        }

        //validate the toUserId is present at DB
        const toUser = await User.findById(toUserId);
        if (!toUser) {
            res.status(400).json({
                message: "To user is not present at DB",
            })
        }
        //Check for existing connection request sent to the user
        const existConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { toUserId, fromUserId },
                { toUserId: fromUserId, fromUserId: toUserId }
            ]
        })
        if (existConnectionRequest) {
            return res.json({
                message: "connection request alrady sent",
            })
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status

        })

        const data = await connectionRequest.save();
        res.status(200).json({
            message: "connection request is sent successfully",
            data,

        })


    } catch (err) {
        res.status(400).send("ERROR" + " " + + err.message);
    }
});

//POST review the connection request recived from others user
requestRouter("/review/recived/:status/:requestId", userAuth, async (req, res) => {

    try {

        const loggedUserId = req.user;
        const { status, requestId } = req.params;

        //Akshay => elon , so the requestId is requestConnection ID send by Akshay to elon
        //Check if logged user should be toUserId
        //Status shold be intersted -then shold be reviewed by this API


        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
            return res.json({ message: "status is not valid" });
        }
        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedUserId,
            status: "interested",

        });
        if (!connectionRequest) {
            return res.json({ message: " Connection request is not found at Database" })
        }

        connectionRequest.status = status;
        const data = await connectionRequest.save();


        res.status(200).json({
            message: "request is reviewed succussfully."
        })

    } catch (err) {
        res.status(400).send("ERROR" + err.message);
    }
});

module.exports = requestRouter;

