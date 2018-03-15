const express = require('express');
const router = express.Router();
const Parking = require("../models/parking");
const distCalculator = require("../consts/distanceCalculator");

router.get('/', (req, res, next) => {
	
	const userCoordinate = {
		lattitude: req.query.lattitude,
		longitude: req.query.longitude
	}	

    Parking.find()
    .exec()
    .then(parkings => {
      console.log(parkings);
      res.status(200).json({
      	parkings: parkings,
      	userCoordinate: userCoordinate
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;