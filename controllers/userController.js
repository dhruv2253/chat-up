const User = require('../models/user');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.sign_up_get = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: get sign up form");
})

exports.sign_up_post = [
    // Validate and sanitize fields.
    body("firstName", "First name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("lastName", "Last name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("email", "Email must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("password", "Password must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("Confirm password", "Confirm password must not be empty.").trim().isLength({ min: 1 }).escape()
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match.");
        }
        return true;
    }),
    
]
