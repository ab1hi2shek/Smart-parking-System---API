const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Parking = require("../models/parking");

router.get("/", (req, res, next) => {
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
});

router.post("/", (req, res, next) => {
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
});

router.delete("/:parkingId", (req, res, next) => {
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
});


module.exports = router;