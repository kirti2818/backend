const express = require('express')
const { get_messages } = require('../services/message.service')
const authMiddleware = require('../middleware/authMiddleware')
const messageRoutes = express.Router()

messageRoutes.use(authMiddleware)
messageRoutes.get("/:chatId", get_messages)

module.exports = messageRoutes