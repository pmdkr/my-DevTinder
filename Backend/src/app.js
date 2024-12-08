
const { adminAuth } = require('./middleware/adminAuth');
require('./config/database');


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

