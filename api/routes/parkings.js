const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const parkingController = require('../controllers/parking');

router.get("/", parkingController.parkings_get_all);

router.post("/", checkAuth, parkingController.parking_add_new);

router.delete("/:parkingId", checkAuth, parkingController.parking_delete_one);


module.exports = router;