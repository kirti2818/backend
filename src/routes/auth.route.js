const express = require('express');
const { signup, login, verify_otp, resend_otp, logout } = require('../services/auth.service');
const authMiddleware = require('../middleware/authMiddleware');
const  authRoutes = express.Router();

authRoutes.post('/signup', signup)
authRoutes.post('/login', login)

authRoutes.use(authMiddleware)
authRoutes.post('/verify-otp',verify_otp)
authRoutes.post('/resend-otp',resend_otp)
authRoutes.post('/logout', logout)

module.exports = authRoutes;