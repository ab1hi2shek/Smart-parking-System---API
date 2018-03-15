const express = require('express');
const router = express.Router();
const Parking = require("../models/parking");
const tools = require("../consts/distanceCalculator");

router.get('/', (req, res, next) => {
	
    Parking.find()
    .exec()
    .then(parkings => {
      console.log(parkings);

      let resultParking = {};
      let minmDist = Math.max();
      parkings.forEach(function(item){
      		lat1 = req.query.lattitude,
      		lon1 = req.query.longitude,
      		lat2 = item.lattitude,
      		lon2 = item.longitude

      		let currDist = tools.getDistance(lat1, lon1, lat2, lon2);
      		if(currDist < minmDist){
      			minmDist = currDist;
      			resultParking = item;
      		}
      });

      res.status(200).json({
      	optimalParking: resultParking,
      	distance: minmDist
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