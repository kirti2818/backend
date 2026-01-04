const express = require('express');
const { signup, login } = require('../services/auth.service');
const  authRoutes = express.Router();

authRoutes.post('/signup', signup)
authRoutes.post('/login', login)


module.exports = authRoutes;