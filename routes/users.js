var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController");
// Get sign up form
router.get("/sign-up", userController.sign_up_get);

// Post sign up form
router.post("/sign-up", userController.sign_up_post);

// Get log in form
router.get("/log-in", userController.log_in_get);

// Post log in form
router.post("/log-in", userController.log_in_post);

module.exports = router;
