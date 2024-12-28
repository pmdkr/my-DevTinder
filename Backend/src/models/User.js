const mongoose = require('mongoose');

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

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;