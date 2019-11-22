var express = require("express");
var Note = require("../models/note");
var router = express.Router();

router.post("/Notes/api/Add", function(req, res) {
  var note = new Note({
        noteId: req.body.noteId,
        patientId: req.body.patientId,
        username: req.body.username,
        title: req.body.title,
        content: req.body.content
    });

  note.save( function(err, res) {
    if (err) 
        return res.json(err);
    else
        return res.json(res);
  });
});

router.post("/Notes/api/Update", function(req, res) {

});

router.post("/Notes/api/Delete", function(req, res) {

});

router.get("/Notes/api/Notes", function(req, res) {
    
});

module.exports = router;
