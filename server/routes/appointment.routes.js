var express = require("express");
var Appointment = require("../models/appointment");
var router = express.Router();
var mongodb = require('mongodb');

// Add a new appointment
router.post("/Calendar/api/Add", function(req, res) {
  
  var appointment = new Appointment({
    key: new mongodb.ObjectID(),
    title: req.body.title,
    notes: req.body.notes,
    reminderMinutes: req.body.reminderMinutes,
    location: req.body.location,
    userEmail: req.body.userEmail,
    startTime: req.body.startTime,
    endTime: req.body.endTime
  });
  appointment.save( function(err, appointment) {
    if (err) 
        return res.status(400).json(err);
    res.status(200).json(appointment);
  });
});

// Update an existing appointment - Find by key
router.post("/Calendar/api/Update", function(req, res) {
  Appointment.updateOne( { key: req.body.key }, 
    { $set: {
      title: req.body.title,
      notes: req.body.notes,
      reminderMinutes: req.body.reminderMinutes,
      location: req.body.location,
      userEmail: req.body.userEmail,
      startTime: req.body.startTime,
      endTime: req.body.endTime
    } },
    function(err, results) {
      if (err) console.log(err);
      res.send(results);
  });
});

// Delete existing appointment by key
router.post("/Calendar/api/Delete", function(req, res) {
  Appointment.findOneAndDelete({ key: req.body.key }, function(err, results) {
    if (err) console.log(err);
    res.send(results);
  });
});

// Get all appointments
router.get("/Calendar/api/Appointments", function(req, res) {
  Appointment.find({}, function(err, results) {
    if (err) console.log(err);
    res.send(results);
  });
});

// Get one appointment by key
router.get("/Calendar/api/Appointments/:key", function(req, res) {
  Appointment.findOne({ key: new mongodb.ObjectID(req.params.key) }, 
    function(err, results) {
      if (err) console.log(err);
      res.send(results);
  });
});

module.exports = router;
