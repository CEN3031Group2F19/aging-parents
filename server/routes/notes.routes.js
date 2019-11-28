var express = require("express");
var Note = require("../models/note");
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../config/config');


mongoose.connect(config.db.uri, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

router.post("/Notes/api/Add", function(req, res) {
  console.log('In add api');
  
  var note = new Note({
        key: req.body.key,
        title: req.body.title,
        text: req.body.content
    });

  note.save( function(err, res) {
    if (err) 
        return res.json(err);
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
