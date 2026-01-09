const express = require('express');
const { signup, login, verify_otp, resend_otp } = require('../services/auth.service');
const authMiddleware = require('../middleware/authMiddleware');
const  authRoutes = express.Router();

authRoutes.post('/signup', signup)
authRoutes.post('/login', login)

authRoutes.use(authMiddleware)
authRoutes.post('/verify-otp',verify_otp)
authRoutes.post('/resend-otp',resend_otp)


module.exports = authRoutes;