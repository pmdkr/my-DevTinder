const mongoose = require('mongoose');
const express = require('express');
const app = express();
const connectDB = async () => {
    await mongoose.connect("mongodb+srv://pramodlohra:kCkiujRcdq9iClrx@devtindercluster.oimjo.mongodb.net/?retryWrites=true&w=majority&appName=devTinderCluster");

}
connectDB().then(() => {
    console.log('Database connected successfuly...');
    app.listen(3000, () => {

        console.log("Server is started at port 3000....");

    });
}).catch(err => {
    console.log("database is not connected...", err);
})
module.exports = connectDB;