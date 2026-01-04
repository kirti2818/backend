const mongoose = require('mongoose');

const connect = async()=>{
    return await mongoose.connect(process.env.mongoDB_url)
}

module.exports = connect