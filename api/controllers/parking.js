const Parking = require("../models/parking");
const mongoose = require("mongoose");
const tools = require("../consts/defaultParking");

exports.parking_reset_to_default = (req, res, next) => {
  Parking.find()
    .exec()
    .then(parkings => {
      parkings.forEach(function(item){
        Parking.remove({ _id: item._id })
        .exec()
      })

      tools.defaultParking.forEach(function(item){
          const parking = new Parking({
              _id: item._id,
              name: item.name,
              lattitude: item.lattitude,
              longitude: item.longitude,
              total_parking_space: item.total_parking_space,
              free_parking_space: item.free_parking_space,
              neighbours_Ids: item.neighbours_Ids
          });
          parking
            .save()
      });
      res.status(200).json({
        message: "Success",
        parkings: tools.defaultParking
      });
    })
    .catch(err => {
        res.status(500).json({
          message: "Failure",
          error: err
        });
    });
}

exports.parkings_get_all = (req, res, next) => {
  Parking.find()
    .exec()
    .then(parkings => {
      console.log(parkings);
      res.status(200).json({
        message: "Success",
        parkings: parkings
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
        message: "Success",
        addedParking: result
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

exports.parking_delete_one = (req, res, next) => {
  const id = req.params.parkingId;
  Parking.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "success",
        deletedParking: result
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

exports.parking_update_one = (req, res, next) => {
  const id = req.params._id;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Parking.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      Parking.find()
      .exec()
      .then(parkings => {
        res.status(200).json({
          message: "Success",
          parkings: parkings
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: "Failure",
          error: err
        });
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




      