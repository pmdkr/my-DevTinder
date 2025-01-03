const express = require('express');
const app = express();
const { adminAuth } = require('./middleware/adminAuth');
const connectDB = require('./config/database');
const User = require("./models/User");

//middleware that converts json request to js object
app.use(express.json());

app.post("/signup", async (req, res) => {
    console.log(req.body);
    const userObj = req.body;
    // const userObj = {
    //     firstName: 'Pramod',
    //     lastName: 'Lohra',
    //     email: 'pramodkrlohra@gmail.com',
    //     password: 'Pramod@123'
    // }
    // //creating a new instance of User model
    // const user = new User(userObj);
    const user = new User(userObj);
    try {
        await user.save();
        res.send("user added successfuly!");

    } catch (err) {
        res.status(400).send(err);

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
    console.log(data);

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

