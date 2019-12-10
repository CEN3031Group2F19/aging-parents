var express = require("express");
var Task = require("../models/task");
var router = express.Router();
var mongodb = require('mongodb');

// Add a new task
router.post("/DailyTasks/api/Add", function(req, res) {
  var task = new Task({
    key: new mongodb.ObjectID(),
    text: req.body.text,
    completed: req.body.completed,
    userEmail: req.body.userEmail,
    scheduledTime: req.body.scheduledTime,
    completedTime: req.body.completedTime,
    helpNeeded: req.body.helpNeeded
  });
  task.save( function(err, task) {
    if (err) 
        return res.status(400).json(err);
    res.status(200).json(task);
  });
});

// Update an existing task - Find by key
router.post("/DailyTasks/api/Update", function(req, res) {
  Task.updateOne( { key: new mongodb.ObjectID(req.body.key) }, 
    { $set: { 
      text: req.body.text,
      completed: req.body.completed,
      userEmail: req.body.userEmail,
      scheduledTime: req.body.scheduledTime,
      completedTime: req.body.completedTime,
      helpNeeded: req.body.helpNeeded
    } },
    function(err, results) {
      if (err) console.log(err);
      res.send(results);
  });
});

// Delete existing task by key
router.post("/DailyTasks/api/Delete", function(req, res) {
  Task.findOneAndDelete({ key: new mongodb.ObjectID(req.body.key) }, 
    function(err, results) {
      if (err) console.log(err);
      res.send(results);
  });
});

// Get all tasks
router.get("/DailyTasks/api/Tasks", function(req, res) {
  Task.find({}, 
    function(err, results) {
      if (err) console.log(err);
      res.send(results);
  });
});

// Get one task by key
router.get("/DailyTasks/api/Tasks/:key", function(req, res) {
  Task.findOne({ key: req.params.key },
    function(err, results) {
      if (err) console.log(err);
      res.send(results);
  });
});

module.exports = router;
