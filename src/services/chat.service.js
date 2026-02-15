const { createChatController, getAllChatController } = require("../controller/chat.controller")

const create_chat = async (body) => {

    try {
        const data = await createChatController({ ...body })
        return ({ message: data.message, status: data.status, code : data.code })

    } catch (error) {
        return ({ message: error.message, status: false, code : 400 })
    }

};

const get_all_chat = async(req,res)=>{
    try {
        const user_id = req.user_id
        const data = await getAllChatController({user_id})
        return res.status(data.code).json({message : data.message, status : data.status, data : data.data})
        
    } catch (error) {

        return res.status(400).json({message : error.message, status : false})
        
    }
}

module.exports = { create_chat, get_all_chat }