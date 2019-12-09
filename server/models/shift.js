var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var Shift = new Schema({
  key: { type: ObjectId, unique: true, required: true },
  userEmail: { type: String, required: true },
  timeIn: { type: Date, required: true },
  timeIn: { type: Date, required: false, default: null },
});

Shift.pre('save', function(next) {
  var now = new Date();
  this.updated_at = now;
  if (!this.createdDate) this.createdDate = now;
  next();
});

module.exports = mongoose.model("Shift", Shift);
