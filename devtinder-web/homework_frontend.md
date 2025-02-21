# DevTinder frontend Homework: 

- Create a Vite +React application
- Remove unecessary code and craete a Hello world app
- Install Tailwind CSS
- Install Daisy UI
- Add NavBar componetn to App.jsx
- Creat a NavBar.jsx separate Component file
- Install react router dom
- Create BrowserRouter > Routes > Route=/ Body > RouteChildren

- Create an Outlet in tour Body Component
- Create footer
- Create  a Login page
- Install axios
- CORS - install cors in backend => add middleware with configuration origin, credentials:true
- Whenever you're making API call , so pass axios => {withcreadentials:true}
- Install react-redux + @redux/toolkit

- configure store => Provider = createSlice => add reducer to store
- Add redux devtools in chrome
- Login and see if your is coming
- Navbar should be update as soon as user logs in
- Refactor our code to add constants file + create a components folder
- You should not be access other routes without login
- If token is not present, redirect user to login page
- Logout feature
- Get the feed and add the feed in the store
- Build the user  card on feed
- Edit Profile feature 

 - body 
 NabBar 
 Route=/ Feed
 Route =/ login =>Login
 Route =/connections = Connectios
 Route =/profile => Profile
 Rotue =/feed => Feed

- Show toast messge on save of profile
- New page- see all my connections
- New page - see all my pending requests
- Feature - Accept/Reject connections request
- Send/Ignore the user card from the feed
- 

# Deployement
- Signup on AWS
- Launch instance
- chmod 400 <space>.pem
- ssh i "devtinder-web-secret.pem" ubuntu@ec2-<IP address of instance>.ap-south-1.compute.amazonaws.com
- install Node version 22.12.0
- Git clone
- Frontend
- npm install -> dependencies install
- npm run build
- sudo apt update
- sudo apt install nginx
- sudo systemctl start nginx
- sudo systemctl enable nginx
- copy code from dist(build files) to /var/www/html/
- sudo scp -r dist/* /var/www/html/
- enable port :80 of your instance
- 
