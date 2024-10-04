const express = require('express');

const app = express();

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

app.use("/user", (req, res) => {

    console.log("Handling the route handler 1");
    // res.send("Resposne 1");
},
    (req, res) => {
        console.log("Handling the request of route handler 2");
        res.send("Response 2");


    })

app.listen(3000, () => {

    console.log("Server is started at port 3000....");

});
