const UserModel = require("../schema/auth.schema")
const socketModel = require("../schema/socket.schema")

const addSocketController = async (data) => {
    try {
        const { user_id, socket_id } = data
        if (!socket_id) return { message: 'Please Provide Socket Id', status: false, code: 400 }

        const find_user_socket = await socketModel.findOne({ user_id })
        console.log(find_user_socket,"find_user_socket")
        const user_details = await UserModel.findById(user_id)
        if (!find_user_socket) {
            const add_socket = new socketModel({ socket_id, user_id })
            await add_socket.validate()
            await add_socket.save()
            return { message: `Socket Added of ${user_details.name}`, status: true, code: 200, socketId : socket_id }
        }
        return { message: `Socket Already Added of ${user_details.name}`, status: true, code: 200,socketId : find_user_socket?.socket_id }



    } catch (error) {
        return { message: error.message, status: false, code: 400 }
    }
}

const deleteSocketController = async (data) => {
    try {
        const { user_id } = data
        if (!user_id) return { message: 'Please Provide User Id', status: false, code: 400 }
        await socketModel.deleteOne({ user_id })
        return { message: 'Socket Deleted', status: true, code: 200 }

    } catch (error) {
        return { message: error.message, status: false, code: 400 } 

    }
}

module.exports = { addSocketController, deleteSocketController }