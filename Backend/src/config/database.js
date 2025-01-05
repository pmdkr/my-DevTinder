require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const url = process.env.MONGODB_URL;

const connectDB = async () => {
    await mongoose.connect(url);

}

module.exports = connectDB;