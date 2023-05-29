const User = require('../models/user');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.sign_up_get = asyncHandler(async(req, res, next) => {
    res.render("sign_up", { title: "Sign Up" });
})

exports.sign_up_post = [
    // Validate and sanitize fields.
    body("firstName", "First name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("lastName", "Last name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("username", "Username must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("password", "Password must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("confirmPassword")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Please confirm your password.")
    .bail()
    .custom( (value, {req}) => {
        // Check if confirm password === password
        if (value !== req.body.password) {
            return false;
        }
        else {
            return true;
        }
    })
    .withMessage("Passwords must match."),

    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req);
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        })

        if (!errors.isEmpty()) {
            res.render("sign_up", { title: "Sign Up", user: user, error_list: errors.array() });
            return;
        } else {
            await user.save();
            res.redirect("/");
        }
    })

]


