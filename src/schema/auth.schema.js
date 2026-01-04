const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    user_name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    is_email_verified : {
        type : Boolean,
        default : false
    }
})

const UserModel = mongoose.model('user',UserSchema)
module.exports = UserModel;