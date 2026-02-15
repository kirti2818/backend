const express = require('express')
const { create_chat, get_all_chat } = require('../services/chat.service')
const authMiddleware = require('../middleware/authMiddleware')
const chatRoute = express.Router()

chatRoute.use(authMiddleware)

chatRoute.post('/create', create_chat)
chatRoute.get('/all', get_all_chat)


module.exports = chatRoute