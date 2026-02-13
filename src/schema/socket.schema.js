const mongoose = require("mongoose");

const socketSchema = mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'user'
    },
    socket_id : {
        type : String,
        required : true
    }
},{timestamps : true, versionKey : false})

const socketModel = mongoose.model("socket", socketSchema)
module.exports = socketModel