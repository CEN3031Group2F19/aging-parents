var express = require("express");
var Medication = require("../models/medication");
var router = express.Router();
var mongodb = require('mongodb');

// Add a new medication
router.post("/Medications/api/Add", function(req, res) {
  var medication = new Medication({
    key: new mongodb.ObjectID(),
    name: req.body.name,
    notes: req.body.notes,
    timeOfDay: req.body.timeOfDay,
    frequency: req.body.frequency,
    pharmacist: req.body.pharmacist,
  });
  medication.save( function(err, medication) {
    if (err) 
        return res.status(400).json(err);
    res.status(200).json(medication);
  });
});

// Update an existing medication - Find by key
router.post("/Medications/api/Update", function(req, res) {
  Medication.updateOne( { key: new mongodb.ObjectID(req.body.key) }, 
    { $set: {
      name: req.body.name,
      notes: req.body.notes,
      timeOfDay: req.body.timeOfDay,
      frequency: req.body.frequency,
      pharmacist: req.body.pharmacist,
    } },
    function(err, results) {
      if (err) console.log(err);
      res.send(results);
  });
});

// Delete existing medication by key
router.post("/Medications/api/Delete", function(req, res) {
  Medication.findOneAndDelete({ key: new mongodb.ObjectID(req.body.key) }, 
    function(err, results) {
      if (err) console.log(err);
      res.send(results);
  });
});

// Get all medications
router.get("/Medications/api/Medications", function(req, res) {
  Medication.find({}, 
    function(err, results) {
      if (err) console.log(err);
      res.send(results);
  });
});

// Get one medication by key
router.get("/Medications/api/Medications/:key", function(req, res) {
  Medication.findOne({ key: new mongodb.ObjectID(req.params.key) }, 
    function(err, results) {
      if (err) console.log(err);
      res.send(results);
  });
});

module.exports = router;
