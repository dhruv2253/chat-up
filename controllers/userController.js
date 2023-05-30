const User = require('../models/user');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");
exports.sign_up_get = asyncHandler(async(req, res, next) => {
    res.render("sign-up", { title: "Sign Up" });
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
        
        if (!errors.isEmpty()) {
            res.render("sign-up", { title: "Sign Up", user: req.body, error_list: errors.array() });
            return;
        } 
        // There are no errors
        foundUser = await User.findOne({username: req.body.username})
        // If username is in use
        if (foundUser) {
            const errorsArray = errors.array();
            usernameTakenError = new Error("Username is already in use. Please choose another.");
            usernameTakenError.msg = "Username is already in use. Please choose another.";
            errorsArray.push(usernameTakenError);
            res.render("sign-up", {title: 'Sign Up', user: req.body, error_list: errorsArray});
            return;
        }
        // Else save the user
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: hashedPassword,
            membershipStatus: false,
        })
        try {
            await user.save();
           
        } catch (err) {
            return next(err);
        }
        res.redirect("/");
    })
]

exports.log_in_get = asyncHandler(async(req, res, next) => {
    res.render("log-in", { title: "Log In" });
})


exports.log_in_post = [
    // Validate and sanitize fields.
    body("username", "Username must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("password", "Password must not be empty.").trim().isLength({ min: 1 }).escape(),
    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            res.render("log-in", { title: "Log In", user: req.body, error_list: errors.array() });
            
            
            return;
        } 
        // There are no errors
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "users/log-in",

        })
    })
]
    



