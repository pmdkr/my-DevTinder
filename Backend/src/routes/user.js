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
userRouter.get('/user/request/connections', userAuth, async (req, res) => {

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

// API- GET /feed 
userRouter.get("/feed", userAuth, async (req, res) => {
    try {

        /**
         * user should be see all conncetions except:
         * 0. his own card
         * 1. his connections
         * 2. ignored people
         * 3. already sent the connections request
         * 
         */
        const loggedUser = req.user;
        const page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        const skip = (page - 1) * limit;

        limit = limit > 50 ? 50 : limit;

        //Find all connections requests (sent + recived)
        const connectionRequests = await ConnectionRequestModel.find({
            $or: [
                { fromUserId: loggedUser._id },
                { toUserId: loggedUser._id }
            ]
        }).select("fromUserId toUserId");

        // will use Set , set will contain only unique value
        const hideUserFromFeed = new Set();
        connectionRequests.forEach(req => {
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        });
        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUserFromFeed) } },
                { _id: { $ne: loggedUser._id } }
            ]

        })
            .select(USER_DATA_SAFE)
            .skip(skip)
            .limit(limit);

        res.json({ data: users });


    } catch (err) {
        res.status(400).send("ERROR" + err.message);

    }
})

module.exports = userRouter;


