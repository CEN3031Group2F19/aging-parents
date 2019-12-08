var express = require("express");
var Note = require("../models/note");
var router = express.Router();
var mongodb = require('mongodb');

// Add a new note
router.post("/Notes/api/Add", function(req, res) {
  var note = new Note({
    key: new mongodb.ObjectID(),  
    title: req.body.title,
    text: req.body.text
  });
  note.save( function(err, note) {
    if (err) 
        return res.status(400).json(err);
    res.status(200).json(note);
  });
});

router.post("/Notes/api/Update", function(req, res) {
  Note.updateOne( { key: req.body.key }, {$set: {title: req.body.title, text: req.body.text } },
    function(err, results) {
      if (err) console.log(err);
      res.send(results);
  });
});

router.post("/Notes/api/Delete", function(req, res) {
  Note.findOneAndDelete({ key: req.body.key }, function(err, results) {
    if (err) console.log(err);
    res.send(results);
  });
});

// Get all notes
router.get("/Notes/api/Notes", function(req, res) {
  Note.find({}, function(err, results) {
    if (err) console.log(err);
    res.send(results);
  });
});

module.exports = router;
