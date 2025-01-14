const express = require('express');
const app = express();
const { adminAuth } = require('./middleware/adminAuth');
const { userAuth } = require('./middleware/userAuth.js');
const connectDB = require('./config/database');
const User = require("./models/User");
const validator = require('validator');
const { validateSignUpData } = require('./utils/validation.js');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

//middleware that converts json request to js object
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
    console.log(req.body);
    const { firstName, lastName, email } = req.body;
    const { password } = req.body;
    // const userObj = {
    //     firstName: 'Pramod',
    //     lastName: 'Lohra',
    //     email: 'pramodkrlohra@gmail.com',
    //     password: 'Pramod@123'
    // }




    try {
        // validation of data
        validateSignUpData(req);

        //Enccypt the password
        const passwordHash = await bcrypt.hash(password, 10);


        //creating a new instance of User model
        const user = new User({
            firstName,
            lastName,
            email,
            password: passwordHash
        });
        await user.save();
        res.status(201).send("user added successfuly!");

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);

    }
    //  await user.save();
    // res.send("user signup successfuly!");
});

//GET user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.email;
    console.log(userEmail);
    try {
        const user = await User.findOne({ email: userEmail });
        res.send(user);

    } catch (err) {
        res.status(401).send("something went wrong,please try lator");

    }

});

//GET user by ID
app.get('/userbyid', async (req, res) => {
    const userId = req.body.userId;
    console.log(userId);
    try {
        const user = await User.findById(userId);
        res.send(user);

    } catch (err) {
        res.status(404).send("user is not found");
    }
})

//Feed API to get all users
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);

    } catch (err) {
        res.status(400).send("something went wrong ");

    }
})
//Delete a user by userId
app.delete("/delete", async (req, res) => {
    const userId = req.body.userId;

    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("user deleted successfully");

    } catch (err) {
        res.status(400).send("Something went wrong");

    }
})

// Update the user data
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    //console.log(data);

    try {
        const user = await User.findByIdAndUpdate(userId, data, {
            returnDocument: 'before',
            runValidators: true,
        });
        console.log(user);
        res.send("User updated successfully");

    } catch (err) {
        res.status(400).send("something went wrong, please try again");
    }
})

//Login API
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);


    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {

            //create a JWT token
            const token = jwt.sign({ _id: user._id }, "DevTinder@321",{ expiresIn: '1h' });

            //send the token to cookie and send as response to the broser(user)
            res.cookie("token", token);

            res.send(`Login is successfull and user name is :  ${user.firstName}`);

        } else {
            throw new Error("Invalid credentials, Please check your credentials");
        }


    } catch (err) {
        res.status(400).send("ERROR" + err.message);
    }
});

//GET user profile using cookie stored after login
app.get("/profile", userAuth, async (req, res) => {

    try {
        const user = req.user;
        if (!user) {
            console.log("user is not found at DB");
        }
        res.status(200).send("Reading the cookie" + ' ' + user.firstName);

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);

    }
});

//POST send a connection request to other user
app.post("/sendConnectionRequest",userAuth, async(req,res)=>{
    res.send("Connection request sent!");
})

//connction to the DB...
connectDB().then(() => {
    console.log('Database connected successfuly...');
    app.listen(3000, () => {

        console.log("Server is started at port 3000....");

    });
}).catch(err => {
    console.log("database is not connected...", err);
})



// app.use matches all type of request and execute route handlers.
// when app.get only match the GET request



// app.use("/test", (req, res) => {
//     res.send("Hello hello hello");
// })

// app.use("/browse", (req, res) => {
//     res.send("Hello from browse page");
// })


// app.use("/", (req, res) => {
//     res.send("Hello from the server");
// })

//
// app.get only handle the GET request
// app.get("/user", (req,res,next)=>{
//     console.log("app .get method api is hit ........")
//     res.send("get method is called"

//     )
// })


// app.use("/admin/getAllData", adminAuth, (req, res) => {

//     console.log("get all data routes is handled at this request")
//     res.send("Sent all user data");



// })

// app.use("/user/deleteData", (req, res, next) => {


// })


// app.use matches all type of request and execute route handlers.
// when app.get only match the GET request



// app.use("/test", (req, res) => {
//     res.send("Hello hello hello");
// })

// app.use("/browse", (req, res) => {
//     res.send("Hello from browse page");
// })


// app.use("/", (req, res) => {
//     res.send("Hello from the server");
// })

//
// app.get only handle the GET request
// app.get("/user", (req,res,next)=>{
//     console.log("app .get method api is hit ........")
//     res.send("get method is called"

//     )
// })

