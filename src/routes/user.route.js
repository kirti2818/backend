const express = require('express')
const { getAllUserService } = require('../services/user.service')
const authMiddleware = require('../middleware/authMiddleware')
const userRoutes = express.Router()

userRoutes.use(authMiddleware)

userRoutes.get('/all',getAllUserService)

module.exports = userRoutes