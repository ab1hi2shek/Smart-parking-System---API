const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const shortestDistanceController = require('../controllers/shortestDistance');

router.get('/', checkAuth, shortestDistanceController.get_parking);


module.exports = router;