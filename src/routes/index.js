const express = require('express');
const authRoutes = require('./auth.route');
const allRoutes = express.Router();

allRoutes.use("/auth",authRoutes);

module.exports = allRoutes;