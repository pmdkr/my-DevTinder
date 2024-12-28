const mongoose = require('mongoose');
const express = require('express');
const app = express();
const connectDB = async () => {
    await mongoose.connect("mongodb+srv://pramodlohra:FSGwk7DgoPrhnRp4@devtindercluster.oimjo.mongodb.net/?retryWrites=true&w=majority&appName=devTinderCluster");

}

module.exports = connectDB;