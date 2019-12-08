var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var Task = new Schema({
  key: { type: ObjectId, unique: true, required: true },
  text: { type: String, required: true },
  completed: {type: Boolean, required: true, default: false},
  userEmail: {type: String, required: false, default: null},
  scheduledTime: {type: Date, required: false, default: null},
  completedTime: {type: Date, required: false, default: null},
  helpNeeded: {type: Number, required: true, default: 0}
});

Task.pre('save', function(next) {
  var now = new Date();
  this.updated_at = now;
  if (!this.createdDate) this.createdDate = now;
  next();
});

module.exports = mongoose.model("Task", Task);
