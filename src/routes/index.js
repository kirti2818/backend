const express = require('express');
const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const allRoutes = express.Router();

allRoutes.use("/auth",authRoutes);
allRoutes.use('/user',userRoutes)

module.exports = allRoutes;