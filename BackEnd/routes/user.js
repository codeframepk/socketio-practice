var express = require("express");
var passport = require("passport");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var router = express.Router();
var userSchemea = require("../models/usersSchema");

router.post("/signup", (req, res) => {
  console.log("singup", req.body);

  userSchemea.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      console.log("user", user);

      res.status(200).json("email already in use");
    } else {
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        console.log("=============hash=======================", err);
        console.log(hash);
        console.log("====================================");
        if (err) {
          res.status(500).json("error has been occored!");
        } else {
          let data = {
            name: req.body.name,
            email: req.body.email,
            password: hash
          };
          console.log("==========new signup==========================");
          console.log(data);
          console.log("====================================");
          let newUser = new userSchemea(data);
          newUser.save((err, user) => {
            if (err) {
              res.status(500).json("error has been occored!");
            } else {
              res.status(200).json("Account has been created!");
            }
          });
        }
      });
    }
  });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("user", req.user);

  res.status(200).json(req.user);
});

router.post("/logout", (req, res) => {
  req.logout();
  res.status(200).json("succefully logout!");
});

router.get("/authenticate", (req, res) => {
  console.log("=========req.user===========================");
  console.log(req.user);
  console.log("====================================");
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  } else {
    res.status(401).json("user is not logged in!");
  }
});

router.post("/emailVerification", (req, res) => {
  userSchemea.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      res.status(200).json("email already in use");
    } else {
      res.status(200).json("readytouse");
    }
  });
});

module.exports = router;
