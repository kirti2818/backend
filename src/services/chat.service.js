const { createChatController } = require("../controller/chat.controller")

const create_chat = async (req, res) => {

    try {
        const user_id = req.user_id;
        const data = await createChatController({ ...req.body, user_id })
        return res.json({ message: data.message, status: data.status }).status(data.code)

    } catch (error) {
        return res.json({ message: error.message, status: false }).status(400)
    }

}

module.exports = { create_chat }