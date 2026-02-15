const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user",
        }
    ],
    is_group_chat: {
        type: Boolean,
        default: false
    },
    chat_name: {
        type: String,
    },
    is_group_admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    last_message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'message'
    }

}, { timestamps: true, versionKey: false })

const chatModel = mongoose.model("chat", chatSchema)
module.exports = chatModel