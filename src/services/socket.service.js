const { addSocketController, deleteSocketController } = require("../controller/socket.controller")

const add_socket = async (body) => {
    try {
        const { user_id, socket_id } = body
        const data = await addSocketController({ user_id, socket_id })
        return data;

    } catch (error) {
        return error;

    }
}

const delete_socket = async (user_id) => {
    try {
        const data = await deleteSocketController({ user_id })
        return data;

    } catch (error) {
        return error;

    }
}

module.exports = { add_socket, delete_socket }