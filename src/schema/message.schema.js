const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        requied: true,
        ref: 'user'
    },
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        requied: true,
        ref: 'user'
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true, versionKey: false })

const messageModel = mongoose.model('message', MessageSchema)
module.exports = messageModel;