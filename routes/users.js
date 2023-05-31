
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');
const message = require('../models/message');

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

// Get membership form
router.get('/membership', userController.membership_get);

// Post membership form
router.post('/membership', userController.membership_post);

router.get('/create-message', messageController.create_message_get); 

router.post('/create-message', messageController.create_message_post);

router.get('/messages', messageController.messages_get);

module.exports = router;
