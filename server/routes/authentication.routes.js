var express = require("express");
var passport = require("passport");
var Account = require("../models/account");
var router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", function(req, res) {
  passport.authenticate("jwt", { session: false })(req, res, function() {
    res.json({ user: req.user });
  });
});

// router.get("/register", function(req, res) {
//   res.render("register", {});
// });

router.post("/register", function(req, res) {
  Account.register(
    new Account({ username: req.body.username }),
    req.body.password,
    function(err, account) {
      if (err) {
        return res.json({ account: account });
      }
      return res.json({ user, token });
      // passport.authenticate("local")(req, res, function() {
      //   res.redirect("/");
      // });
    }
  );
});

router.post("/login", passport.authenticate("local"), function(req, res) {
  const { user } = req;
  const token = jwt.sign(user._id.toString(), "secret"); //TODO change this

  return res.json({ user, token });
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

router.get("/ping", function(req, res) {
  res.status(200).send("pong!");
});

module.exports = router;
