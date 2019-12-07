var express = require("express");
var passport = require("passport");
var Account = require("../models/account");
var router = express.Router();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

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

// router.get("/reset", (req, res) => {
//   Account.findOne({
//     //username: req.body.username,
//     resetPasswordToken: req.body.resetPasswordToken
//     //resetPasswordExpires: { $gte: new Date() }
//   }).then(user => {
//     if (user == null) {
//       console.error("Reset: password reset link is invalid or has expired");
//       res.status(403).send("password reset link is invalid or has expired");
//     } else {
//       console.log("username: ", user.username);
//       res.status(200).send({
//         username: user.username,
//         message: "password reset link a-ok"
//       });
//     }
//   });
// });
router.get("/reset", (req, res) => {
  console.log("TOKEN: ", req.query.resetPasswordToken);
  Account.findOne(
    {
      //username: req.body.username,
      resetPasswordToken: req.query.resetPasswordToken
      //resetPasswordExpires: { $gte: new Date() }
    },
    (err, user) => {
      if (user == null) {
        console.error("Reset: password reset link is invalid or has expired");
        res.status(403).send("password reset link is invalid or has expired");
      } else {
        console.log("username: ", user.username);
        res.status(200).send({
          username: user.username,
          message: "password reset link a-ok"
        });
      }
    }
  );
});

router.put("/updatePasswordViaEmail", (req, res) => {
  console.log(req.body.username);
  Account.findOne({
    username: req.body.username,
    resetPasswordToken: req.body.resetPasswordToken
    //todo: compare dates
    // resetPasswordExpires: {
    //   $gte: Date.now()
    // }
  }).then(user => {
    if (user == null) {
      console.error("password reset link is invalid or has expired");
      res.status(403).send("password reset link is invalid or has expired");
    } else if (user != null) {
      console.log("user exists in db");
      console.log(req.body.password);
      user.setPassword(req.body.password, () => user.save());
      // user.resetPasswordToken = null;
      // user.resetPasswordExpires = null;
      user.save().then(() => {
        console.log("password updated");
        res.status(200).send({ message: "password updated" });
      });
    } else {
      console.error("no user exists in db to update");
      res.status(401).json("no user exists in db to update");
    }
  });
});

router.post("/forgotpassword", (req, res) => {
  if (req.body.email === "") {
    res.status(400).send("email required");
  }
  console.error(req.body.email);
  Account.findOne({
    username: req.body.email
  }).then(acct => {
    console.log(acct);
    if (acct === undefined) {
      console.error("email not in database");
      res.status(403).send("email not in db");
    } else {
      const token = crypto.randomBytes(20).toString("hex");
      acct.resetPasswordToken = token;
      acct.resetPasswordExpires = Date.now() + 360000;
      acct.save();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: `${require("../config/utils").gmail.email}`,
          pass: `${require("../config/utils").gmail.password}`
        }
      });

      const mailOptions = {
        from: "testPatientCare@gmail.com",
        to: `${acct.username}`,
        subject: "Link To Reset Password",
        text:
          "You are receiving this because you have requested a password reset.\n\n" +
          "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
          `${
            process.env.NODE_ENV === "production"
              ? "https://aging-parent-care.herokuapp.com/"
              : "localhost:3000"
          }/resetPassword/${token}\n\n` +
          "If you did not request this, please ignore this email and your password will remain unchanged.\n"
      };

      console.log("sending mail");

      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error("there was an error: ", err);
        } else {
          console.log("here is the res: ", response);
          res.status(200).json("recovery email sent");
        }
      });
    }
  });
});

module.exports = router;
