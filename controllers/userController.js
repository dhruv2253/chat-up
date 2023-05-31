const User = require('../models/user');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Get home page
exports.index_get = asyncHandler(async(req, res, next) => {
    res.render("index", { title: "Home" });
})

// Get sign up form
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
            // Add error to array
            errorsArray.push(usernameTakenError);
            res.render("sign-up", {title: 'Sign Up', user: req.body, error_list: errorsArray});
            return;
        }
        // Else save the user

        // Hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create new user
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: hashedPassword,
            membershipStatus: false,
        })
        try {
            // Save user
            await user.save();
           
        } catch (err) {
            return next(err);
        }
        res.redirect("/");
    })
]

// Get log in form
exports.log_in_get = asyncHandler(async(req, res, next) => {
    res.render("login", { user: req.user});
})

// Post log in form
exports.log_in_post = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login"
});

// Get log out
exports.log_out_get = asyncHandler(async(req, res, next) => {
    // Log out
    req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
});

// Get membership form
exports.membership_get = asyncHandler(async(req,res,next) => {
    res.render("membership", {title: "Membership"});
})

// Post membership form
exports.membership_post = [
    // validate and sanitize fields
    body("memberKey")
        .trim()
        .escape(),
    async (req, res, next) => {
        // Check if passcode is correct
        if (req.body.memberKey !== process.env.MEMBER_KEY) {
            // Incorrect, rerender
            res.render('membership', {title: 'Member Key', incorrect: true});
            return;
        }
        // Passcode is correct
        await User.findOneAndUpdate({username: req.user.username}, {membershipStatus: true})
        res.redirect("/");
    }
]

// Get admin form
exports.admin_get = asyncHandler(async(req,res,next) => {
    res.render("admin", {title: "Admin"});
})

// Post admin form
exports.admin_post = [
    // validate and sanitize fields
    body("adminKey")
        .trim()
        .escape(),
    async (req, res, next) => {
        // Check if passcode is correct
        if (req.body.adminKey !== process.env.MEMBER_KEY) {
            // Incorrect, rerender
            res.render('admin', {title: 'Member Key', incorrect: true});
            return;
        }
        // Passcode is correct
        await User.findOneAndUpdate({username: req.user.username}, {isAdmin: true})
        res.redirect("/");
    }
]

