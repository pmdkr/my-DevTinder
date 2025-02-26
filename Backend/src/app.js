require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
}));

// Routes
const authRouter = require('./routes/auth.js');
const profileRouter = require('./routes/profile.js');
const requestRouter = require('./routes/request.js');
const userRouter = require('./routes/user.js');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);

// Connect to the database and start the server
connectDB().then(() => {
    console.log('Database connected successfully...');
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server is started at port ${PORT}...`);
    });
}).catch(err => {
    console.error("Database connection failed:", err);
});
