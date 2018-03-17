const Parking = require("../models/parking");
const tools = require("../consts/distanceCalculator");
const mongoose = require("mongoose");

exports.get_parking = (req, res, next) => {
	
    Parking.find()
    .exec()
    .then(parkings => {
    	console.log(parkings);

      	let resultParking = {};
      	let minmDist = process.env.maximum;
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
      		message: "Success",
      		minimumDistanceParking: resultParking,
      		minimumDistance: minmDist
      	});
    })

    .catch(err => {
      	console.log(err);
      	res.status(500).json({
      		message: "Failure",
        	error: err
      	});
    });
};