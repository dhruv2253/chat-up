const Message = require('../models/message')
const User = require('../models/user')
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.messages_get = asyncHandler(async(req, res, next) => {
     // Get all messages
     try {
        const messages = await Message.find().populate("author")
        // No errors
        res.render('messages', {title: "Messages", message_list: messages, user: req.user})
    } catch (err) {
        console.log(err)
        next(err);
    }
})

exports.create_message_get = asyncHandler(async(req, res, next) => {
    res.render("create-message", { title: "Create Message" });
})

exports.create_message_post = [
    // Validate and sanitize fields.
    body("title", "Title must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("message", "Message must not be empty.").trim().isLength({ min: 1 }).escape(),
  
    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
      // If there are errors
      if (!errors.isEmpty()) {
        const messages = await Message.find({}).populate("author");
        res.render("create-message", { title: "Create Message", messageAttempt: req.body.message, messageTitle: req.body.title, error_list: errors.array(), message_list: messages, user: req.user });
      }
  
      try {
        const author = await User.findOne({ username: req.user.username });
        const newMessage = new Message({
          title: req.body.title,
          text: req.body.message,
          added: new Date(),
          author: author
        });
        await newMessage.save();
      } catch (err) {
        return next(err);
      }
      res.redirect("/users/messages");
    })
  ];


exports.message_delete_post = asyncHandler(async(req, res, next) => {
    try {
        await Message.findByIdAndRemove(req.params.id);
        console.log("Deleting message", req.params.id);
        res.redirect("/users/messages");
    } catch (err) {
        return next(err);
    }
})
  