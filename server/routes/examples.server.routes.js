const examples = require('../controllers/examples.server.controller.js'),
    express = require('express'), 
    router = express.Router()

/*
var express = require("express");
var SchemaName = require("../models/schemaName");
var router = express.Router();
var mongodb = require('mongodb');

// Add request logic
router.post("/RoutePath", function(req, res) {
  var schemaName = new SchemaName({
    property1: req.body.propertyValue1,
    property2: req.body.propertyValue2,
    property3: req.body.propertyValue3,
  });
  schemaName.save( function(err, schemaName) {
    if (err) 
        return res.status(400).json(err);
    res.status(200).json(schemaName);
  });
});

// Update request logic
router.post("/RoutePath", function(req, res) {
  SchemaName.updateOne( { key: req.body.key }, 
    { $set: {
      property1: req.body.propertyValue1,
      property2: req.body.propertyValue2,
      property3: req.body.propertyValue3,
    } },
    function(err, results) {
      if (err) console.log(err);
      res.send(results);
  });
});

// Delete request logic
router.post("/RoutePath", function(req, res) {
  SchemaName.findOneAndDelete({ key: req.body.key }, function(err, results) {
    if (err) console.log(err);
    res.send(results);
  });
});

// Get request logic
router.get("/RoutePath", function(req, res) {
  SchemaName.find({}, function(err, results) {
    if (err) console.log(err);
    res.send(results);
  });
});
*/    

router.route('/')
  .get(examples.hello);
  
module.exports = router;