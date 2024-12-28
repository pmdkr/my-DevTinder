#Dev Tinder Backend Homework: 
- Create a repository
- Initialize the repository
- node_modules, package.json, package-lock.json
- Install express
- Create a server
- Listen to port 3000
- Write request handlers for /test, /hello
- Install nodemon and update scripts inside package.json
- What are dependencies
- What is the use of "-g" while npm install
- Diffrence between caret and tilde ( ^ vs ~)



- initialize git
- gitignore
- Create a remote repo on github
- Push all code to remote origin
- Play with routes extensions ex /hello, /hello/2, /xyz
- Order of routes matter a  lots
- Install Postman app and make workspace/collection >test API call
- Write logic to handle GET, POST, PATCH, DELETE API Calls and test them on Postman
- Explore routing and use of ?, +, (), * in the routes
- use of regex in routes /a/, /.efly$
- Reading the query parmas in the routes
- Reading the dyamic routes 




- Multiple route handlers - play with code
- next()
- next function and errors along with res.send()
- app.use("/route", rH,[rH2,rH3],rH4,rH5);
- What is Middleware? why do we need it?
- How express Js basically handle requests behind the scenes
- Diffrence app.use and app.all
- Write a dummy auth middleware for all users routes, except /user/login
- Error Handling using app.use("/",(err, req, res,next)={});


- Create a free cluster on MongoDB offical website (MongoDB Atlas)
- Install mongoose library
- Connect your application to the Database "connection-url"/devTinder"
- Call the connectDB function and connect to database before starting application on 3000
- Create a userSchema and UserModel
- Create POST /sign API to add data to database
- Push some documents using API calls from Postman
- Error Handling using try, catch



- JS object vs JSON (Diffrence)
- Add the express.json middleware to tour app
- Make tour signup API dynmic to recive data from the end user
- User.findOne with duplicate eamil ids, which object returned
- API - Get user by eamil
- API - Feed API -Get/Feed - get all the users from the database
- Get user by ID
- Create a delete user API
- Diffrence between PATCH and PUT
- API - update a user
- Explore the Mongoose documentation for UserModel API
- What are the options in a Model.findOneAndUpdate method, explore more about it
- API - Update the user with email ID



