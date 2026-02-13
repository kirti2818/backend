const UserModel = require("../schema/auth.schema");
const chatModel = require("../schema/chat.schema")

const createChatController = async (data) => {
    try {
        const { user_id, participants, is_group_chat } = data;
        if (!participants) return { message: 'Please provide particpants', status: false, code: 400 }
        let dataToInsert = { participants: [user_id, ...participants] }

        // const isAllParticipantsEmailVerified = participants.every(async(el)=>await UserModel.find({_id : new ObjectId(el), is_email_verified : true}) )


        if (is_group_chat) {
            const { is_group_admin, chat_name } = data
            dataToInsert = { ...dataToInsert, is_group_chat, is_group_admin, chat_name }
        }

        const createChat = new chatModel({ ...dataToInsert })
        await createChat.validate();
        await createChat.save();

        return { message: 'Chat Created', status: true, code: 200 }

    } catch (error) {

        return { message: error.message, status: false, code: 400 }

    }
}

module.exports = { createChatController }