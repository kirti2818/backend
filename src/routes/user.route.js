const express = require('express')
const { get_all_user, get_me } = require('../services/user.service')
const authMiddleware = require('../middleware/authMiddleware')
const userRoutes = express.Router()

userRoutes.use(authMiddleware)
userRoutes.get('/me', get_me)
userRoutes.get('/all', get_all_user)

module.exports = userRoutes