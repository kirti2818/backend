const mongoose  = require("mongoose");

const otpSchema = mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    otp : {
        type : String,
        required : true
    },
    expiry_date : {
        type : Date,
        required : true
    }
},{timestamps : true,versionKey : false})

const otpModel = mongoose.model('otp',otpSchema)
module.exports = otpModel;