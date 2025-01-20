const express = require('express');
const app = express();
const { adminAuth } = require('./middleware/adminAuth');
const { userAuth } = require('./middleware/userAuth.js');
const connectDB = require('./config/database');
const User = require("./models/User");
const validator = require('validator');

const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

//middleware that converts json request to js object
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth.js');
const profileRouter = require('./routes/profile.js');
const requestRouter = require('./routes/request.js');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);



//connction to the DB...
connectDB().then(() => {
    console.log('Database connected successfuly...');
    app.listen(3000, () => {

        console.log("Server is started at port 3000....");

    });
}).catch(err => {
    console.log("database is not connected...", err);
});