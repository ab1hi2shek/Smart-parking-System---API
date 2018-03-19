const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/user");

exports.signup_user = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Failure"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
            	message: "Failure",
              	error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "Success",
                  body: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                	message: "Failure",
                  	error: err
                });
              });
          }
        });
      }
    });
};

exports.login_user = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Failure"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Failure"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
              name: user[0].name
            },
            process.env.JWT_KEY,
            {
                expiresIn: "4h"
            }
          );
          return res.status(200).json({
            message: "Success",
            name: user[0].name,
            email: user[0].email,
            token: token
          });
        }
        res.status(401).json({
          message: "Failure"
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

exports.delete_user = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Success",
        deletedUser: result
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

exports.users_get_all = (req, res, next) => {
  User.find()
    .exec()
    .then(users => {
      console.log(users);
      res.status(200).json({
        message: "Success",
        users: users
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
