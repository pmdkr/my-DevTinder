const mongoose = require('mongoose');

const connectionRequestSchema = mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",

    },
    status: {
        type: String,
        enum: {
            values: ["interested", "ignored", "accepted", "rejected"],
            message: `{VALUE} is incorrect`,
        }
    }

},
    {
        timestamps: true,
    }
);

//Schema leval validation for sender and reciver should be diffrent
connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;

    //Check if toUserId is same as fromUserId
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Connot sent request to Yourself!")
    }
    next();

});

const connectionRequestModel = mongoose.model("connectionRequest", connectionRequestSchema);
module.exports = connectionRequestModel;