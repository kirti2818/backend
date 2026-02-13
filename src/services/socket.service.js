const { addSocketController } = require("../controller/socket.controller")

const add_socket = async (body) => {
    try {
        const { user_id, socket_id } = body
        const data = await addSocketController({ user_id, socket_id })
        return data;

    } catch (error) {
        return error;

    }
}

module.exports = { add_socket }