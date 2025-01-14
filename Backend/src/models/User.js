const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        requird: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    photoURL: {
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png",

    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender is not valid");
            }
        },
    },
    password: {
        type: String,
        required: true,

    },
    age: {
        type: Number,
    },
    about: {
        type: String,
        default: "this is default about of the user",

    },
    skills: {
        type: [String],
        default: ["JavaScript", "python", "HTML", "CSS"],
    }
})

// Schema leeval methods,=> offloads the task that closed to the user/schema
// here every user has uniqe own jwt token . so we can add this to schema level method


userSchema.methods.getJWT = async function () {
    // here THIS refers to the current user instance
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "DevTinder@321", { expiresIn: '1h' });
    return token;

}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    // here THIS refers to the current user instance
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash);
    return isPasswordValid;

}

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;