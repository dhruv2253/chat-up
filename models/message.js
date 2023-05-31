const mongoose = require('mongoose')
const Schema = mongoose.Schema
const messageSchema = new Schema({
    title: String,
    text: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    added: Date
})
module.exports = mongoose.model('Message', messageSchema)