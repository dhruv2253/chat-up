const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    membershipStatus: String
});

userSchema.virtual('url').get(function() {
    return `/users/${this._id}`;
});

module.exports = mongoose.model('User', userSchema);
