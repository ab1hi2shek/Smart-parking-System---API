const Parking = require("../models/parking");
const mongoose = require("mongoose");

exports.parkings_get_all = (req, res, next) => {
  Parking.find()
    .exec()
    .then(parkings => {
      console.log(parkings);
      res.status(200).json(parkings);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.parking_add_new = (req, res, next) => {
  const parking = new Parking({
    _id: req.body.id,
    name: req.body.name,
    lattitude: req.body.lattitude,
    longitude: req.body.longitude,
    total_parking_space: req.body.total_parking_space,
    free_parking_space: req.body.free_parking_space,
    neighbours_Ids: req.body.neighbours_Ids
  });

  parking
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.parking_delete_one = (req, res, next) => {
  const id = req.params.parkingId;
  Parking.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};