const express = require('express')
const { create_chat } = require('../services/chat.service')
const authMiddleware = require('../middleware/authMiddleware')
const chatRoute = express.Router()

chatRoute.use(authMiddleware)

chatRoute.post('/create', create_chat)


module.exports = chatRoute