const express=require('express');
const requestRouter=express.Router();
const {userAuth}=require('../middleware/userAuth.js');


//POST send a connection request to other user
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    res.send("Connection request sent!");
});

module.exports=requestRouter;

