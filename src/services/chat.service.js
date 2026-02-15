const { createChatController } = require("../controller/chat.controller")

const create_chat = async (body) => {

    try {
        const data = await createChatController({ ...body })
        return ({ message: data.message, status: data.status, code : data.code })

    } catch (error) {
        return ({ message: error.message, status: false, code : 400 })
    }

}

module.exports = { create_chat }