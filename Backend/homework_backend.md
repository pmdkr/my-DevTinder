# Dev Tinder Backend Homework:

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
- Order of routes matter a lots
- Install Postman app and make workspace/collection >test API call
- Write logic to handle GET, POST, PATCH, DELETE API Calls and test them on Postman
- Explore routing and use of ?, +, (), \* in the routes
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

- Explore schematype option from the documentation
- add required , uinque, lowercase, min, trim,maxLength
- Add default
- Create a custiom validate function for gender
- Improve the DB schema- PUT all appropirate validations on each field in Schema
- add timestamps to the User
- Add API -level validation on PATCH request & signup POST API
- DATA sanitizing - add API validation for each field
- install validator NPM package
- Explore validator library function and use validator function for password, email & PhotoURL
- NEVER trust req.body

- validate data in Signup API
- Install bcrypt package
- Craete passwordHash using bcrypt.hash & save the user is encrypted password
- Create Login API
- Compare passwords and throw error if email or password is invalid

- Install cookie-parser
- Just send a dumy cookie to the user
- Create a GET /profile API and check if you get cookie back
- Install jwtwebtoken
- In login API, after email and password validation, create a JWT token and send back to the user
- Read the cookie inside your Profile API & find logged user
- userAuth middleware
- Add the userAuth middleware in profile API and a new sendConnectionRequest API
- Set the expiry of jwt token and cookies for 7 days


- (Refactoring the code ) Add Schema leval methods that 
- Craete userSchema methods to getJWT()
- Create userSchema methods to comapre password validatePassword(passowrd);
