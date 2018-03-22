const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const parkingController = require('../controllers/parking');

router.get("/", parkingController.parkings_get_all);

router.post("/", parkingController.parking_add_new);

router.patch("/:parkingId", parkingController.parking_update_one)

router.delete("/:parkingId", parkingController.parking_delete_one);

router.get("/reset", parkingController.parking_reset_to_default);


module.exports = router;