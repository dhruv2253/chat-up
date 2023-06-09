const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    membershipStatus: Boolean,
    isAdmin: Boolean
});


module.exports = mongoose.model('User', userSchema);
