
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

// Get admin form
router.get('/admin', userController.admin_get);

// Post admin form
router.post('/admin', userController.admin_post);

// Get create message form
router.get('/create-message', messageController.create_message_get); 

// Post create message form
router.post('/create-message', messageController.create_message_post);

// Get messages
router.get('/messages', messageController.messages_get);

// Delete message
router.post('/messages/:id/delete', messageController.message_delete_post);

module.exports = router;
