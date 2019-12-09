var express = require("express");
var Shift = require("../models/shift");
var router = express.Router();
var mongodb = require('mongodb');

// Add a new shift
router.post("/Timesheet/api/Add", function(req, res) {
  var shift = new Medication({
    key: new mongodb.ObjectID(),
    userEmail: req.body.userEmail,
    timeIn: req.body.timeIn,
    timeIn: req.body.timeOut
  });
  shift.save( function(err, shift) {
    if (err) 
        return res.status(400).json(err);
    res.status(200).json(shift);
  });
});

// Update an existing shift - Find by key
router.post("/Timesheet/api/Update", function(req, res) {
  Shift.updateOne( { key: new mongodb.ObjectID(req.body.key) }, 
    { $set: {
      userEmail: req.body.userEmail,
      timeIn: req.body.timeIn,
      timeIn: req.body.timeOut
    } },
    function(err, results) {
      if (err) console.log(err);
      res.send(results);
  });
});

// Delete existing shift by key
router.post("/Timesheet/api/Delete", function(req, res) {
  Shift.findOneAndDelete({ key: new mongodb.ObjectID(req.body.key) }, 
    function(err, results) {
      if (err) console.log(err);
      res.send(results);
  });
});

// Get all shifts
router.get("/Timesheet/api/Shifts", function(req, res) {
  Shift.find({}, 
    function(err, results) {
      if (err) console.log(err);
      res.send(results);
  });
});

// Get one shift by key
router.get("/Timesheet/api/Shifts/:key", function(req, res) {
  Shift.findOne({ key: new mongoldb.ObjectID(req.params.key) }, 
    function(err, results) {
      if (err) console.log(err);
      res.send(results);
  });
});

module.exports = router;
