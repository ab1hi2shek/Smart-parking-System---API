const Parking = require("../models/parking");
const distCalculator = require("../consts/distanceCalculator");
const mongoose = require("mongoose");
const tools = require("../consts/distanceCalculator");

exports.get_parking = (req, res, next) => {
	
    Parking.find()
    .exec()
    .then(parkings => {


		let max_parking_space = process.env.max_parking_space;
		let max_distance = process.env.max_distance;
		let minm_cost = process.env.maximum;
		let resultParking = {};	

    	parkings.forEach(function(item){
	    	let currDist = tools.getDistance(req.query.lattitude, req.query.longitude,
	    		item.lattitude, item.longitude);
	    	let filled_parking_space = item.total_parking_space - item.free_parking_space;

	    	let distRatio = currDist/max_distance;
	    	let spaceRatio = filled_parking_space/max_parking_space;

	    	let curr_cost = 0.2 * distRatio + 0.8 * spaceRatio;

	    	if(curr_cost < minm_cost){
	    		minm_cost = curr_cost;
	    		resultParking = item;
	    	}
	    });

      	res.status(200).json({
      		message: "Success",
      		minCostParking: resultParking,
      		minimumCost: minm_cost
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