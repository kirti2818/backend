const messageModel = require("../schema/message.schema");
const { create_chat } = require("../services/chat.service");

const sendMessageController = async (data) => {
    try {
        if (!data.sender_id || !data.user_id || !data.message) return { message: 'Please Provide all fields', status: false, code: 400 }
        const add_message = new messageModel({ ...data })
        await add_message.validate();

        const add_chat = await create_chat({participants : [data.user_id, data.sender_id], last_message : add_message._id})
        if(add_chat.code == 200){
             await add_message.save();
             return { message: 'Message sent !', status: true, code: 200 }
        }

    } catch (error) {
        console.log('Error in Send Message controller ...',error.message)
        return { message: error.message, code: 400, status: false }

    }
}

module.exports = { sendMessageController }