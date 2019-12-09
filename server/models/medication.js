var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var Medication = new Schema({
  key: { type: ObjectId, unique: true, required: true },
  name: { type: String, required: true },
  notes: {type: String, required: false, default: ''},
  timeOfDay: {type: String, required: false, default: null},
  frequency: {type: String, required: false, default: null},
  pharmacist: {type: String, required: false, default: null},
});

Medication.pre('save', function(next) {
  var now = new Date();
  this.updated_at = now;
  if (!this.createdDate) this.createdDate = now;
  next();
});

module.exports = mongoose.model("Medication", Medication);
