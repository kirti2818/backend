const messageModel = require("../schema/message.schema");
const { create_chat } = require("../services/chat.service");
const { Types } = require('mongoose')

const sendMessageController = async (data) => {
    try {
        if (!data.sender_id || !data.user_id || !data.message) return { message: 'Please Provide all fields', status: false, code: 400 }
        let add_message = new messageModel({ ...data })

        const add_chat = await create_chat({ participants: [data.user_id, data.sender_id], last_message: add_message._id })
        if (add_chat.code == 200) {
            add_message.chat_id = add_chat.chatId
            await add_message.validate();
            await add_message.save();
            return { message: 'Message sent !', status: true, code: 200, data: add_message }
        }

    } catch (error) {
        console.log('Error in Send Message controller ...', error.message)
        return { message: error.message, code: 400, status: false }

    }
}

const getMessagesController = async (body) => {
    try {
        const { chatId } = body;
        const fetch_messages = await messageModel.find({ chat_id: new Types.ObjectId(chatId) })
        return { message: 'Fetch All Messages...', status: true, data: fetch_messages, code: 200 }

    } catch (error) {
        return { message: error.message, status: false, code: 400 }

    }
}

module.exports = { sendMessageController, getMessagesController }