const express = require('express');
const { dasboardContoller } = require('../controllers/dasboardContollers/dasboardContoller');
const authRoutes = require('./authRoutes/authRoutes');
const dasboardRoutes = require('./dashboardRoutes/dashboardRoutes');

const routes = express.Router();

routes.use("/auth", authRoutes);
routes.use("/dashboard", dasboardRoutes);
routes.use("/blogs", dasboardRoutes);

routes.get("/", dasboardContoller);

module.exports = routes;