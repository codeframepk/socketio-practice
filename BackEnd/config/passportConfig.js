var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var UserModel = require("../models/usersSchema");
const bcrypt = require("bcrypt");

function passportSetup() {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, function(
      email,
      password,
      done
    ) {
      UserModel.findOne({ email: email }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "user not registered yet!" });
        }
        console.log("ps", password);

        bcrypt.compare(password, user.password, function(err, res) {
          if (err) {
            return done(err);
          } else if (res) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Incorrect password." });
          }
        });

        // if (user.password != password) {
        //   return done(null, false, { message: "Incorrect password." });
        // }
      });
    })
  );

  passport.serializeUser(function(user, done) {
    console.log("sere", user);

    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    UserModel.findById(id, function(err, user) {
      done(err, user);
    });
  });
}

module.exports = passportSetup;
