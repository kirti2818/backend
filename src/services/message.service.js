const { sendMessageController, getMessagesController } = require("../controller/message.controller")

const send_message = async (body) => {
    try {
        const { sender_id, user_id, message } = body
        const data = await sendMessageController({ user_id, sender_id, message })
        return data

    } catch (error) {
        return ({ message: error.message, status: false })

    }

}

const get_messages = async (req, res) => {
    try {
        const chatId = req.params.chatId
        const data = await getMessagesController({ chatId })
        return res.status(data.code).json({ message: data.message, data: data.data, status: data.status })

    } catch (error) {
        return res.status(400).json({ message: error.message, status: false })

    }
}

module.exports = { send_message, get_messages }