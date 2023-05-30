
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');


// Get sign up form
router.get('/sign-up', userController.sign_up_get);

// Post sign up form
router.post('/sign-up', userController.sign_up_post);

// Get log in form
router.get('/login', userController.log_in_get);

// Post log in form
router.post('/login', userController.log_in_post);

// Get log out
router.get('/logout', userController.log_out_get);

module.exports = router;
