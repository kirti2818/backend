const { sendMessageController } = require("../controller/message.controller")

const send_message = async(body)=>{
    try {
        const {sender_id,user_id,message} = body
        const data = await sendMessageController({user_id,sender_id,message})
        return data
        
    } catch (error) {
        return ({message : error.message, status : false})
        
    }

}

module.exports = {send_message}