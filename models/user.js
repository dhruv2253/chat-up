const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    membershipStatus: String
});


module.exports = mongoose.model('User', userSchema);
