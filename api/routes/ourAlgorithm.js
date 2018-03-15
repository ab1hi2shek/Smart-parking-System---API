const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	
	const userCoordinate = {
		lattitude: req.query.lattitude,
		longitude: req.query.longitude
	}	

    res.status(200).json({
        message: 'Handling GET requests to /our-algorithm',
        userCoordinate: userCoordinate
    });
});

module.exports = router;