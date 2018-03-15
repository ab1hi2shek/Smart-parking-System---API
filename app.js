const express = require('express');
const app = express();

const parkingRoutes = require('./api/routes/parkings');

app.use('/parkings', parkingRoutes);

module.exports = app;