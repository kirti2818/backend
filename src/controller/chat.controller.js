const UserModel = require("../schema/auth.schema");
const chatModel = require("../schema/chat.schema")
const { Types } = require('mongoose')

const createChatController = async (data) => {
    try {
        const { participants, is_group_chat, last_message } = data;
        if (!participants) return { message: 'Please provide particpants', status: false, code: 400 }
        let dataToInsert = { participants: [...participants] }

        // const isAllParticipantsEmailVerified = participants.every(async(el)=>await UserModel.find({_id : new ObjectId(el), is_email_verified : true}) )

        // check if chat already created 
        const sortedParticipants = participants
            .map(id => new Types.ObjectId(id))
            .sort((a, b) => a.toString().localeCompare(b.toString()));

        const findChat = await chatModel.aggregate([
            {
                $match: {
                    is_group_chat: false
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'participants',
                    foreignField: "_id",
                    as: "participantDetails"
                }

            },
            // checking all participants should be email verified
            {
                $match: {
                    participantDetails: {
                        $not: { $elemMatch: { is_email_verified: false } }
                    }
                }
            },
            {
                $addFields: {
                    sortedParticipants: {
                        $sortArray: { input: "$participants", sortBy: 1 }
                    }
                }
            },
            {
                $match: {
                    sortedParticipants: sortedParticipants
                }
            }
            // { $limit: 1 }
        ])
        if (findChat.length) {
            const updateLastMessage = await chatModel.findByIdAndUpdate(findChat[0]._id, { last_message }, { new: true })
            return { message: 'Chat Already created, last message updated', status: true, code: 200 }
        }

        if (is_group_chat) {
            const { is_group_admin, chat_name } = data
            dataToInsert = { ...dataToInsert, is_group_chat, is_group_admin, chat_name }
        }

        const createChat = new chatModel({ ...dataToInsert, last_message })
        await createChat.validate();
        await createChat.save();

        return { message: 'Chat Created', status: true, code: 200 }

    } catch (error) {
        console.log('Error in Create chat controller ...', error.message)
        return { message: error.message, status: false, code: 400 }

    }
}

module.exports = { createChatController }