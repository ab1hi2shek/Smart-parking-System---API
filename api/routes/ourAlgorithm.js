const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const ourAlgorithmController = require('../controllers/ourAlgorithm');

router.get('/', checkAuth, ourAlgorithmController.get_parking);

module.exports = router;