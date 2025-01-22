const validator = require('validator');
const validateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid");
    } else if (!validator.isEmail(email)) {
        throw new Error("Invalid Email");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Password must be strong");
    }


};

const validateProfileUpdateData = (req) => {
    const allowedEditFields = [
        "email",
        "age",
        "gender",
        "about",
        "skills",
        "photoURL"
    ];
    const isAllowed = Object.keys(req.body).every((field) =>
        allowedEditFields.includes(field));
    return isAllowed;




};
module.exports = {
    validateSignUpData,
    validateProfileUpdateData,
}