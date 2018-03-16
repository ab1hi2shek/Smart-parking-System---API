const express = require("express");
const router = express.Router();

const userController = require('../controllers/user');

router.post("/signup", userController.signup_user);

router.post("/login", userController.login_user);

router.delete("/:userId", userController.delete_user);

module.exports = router;