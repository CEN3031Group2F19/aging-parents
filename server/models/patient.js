var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Appointment = require("./appointment");
var Note = require("./note");
var Shift = require("./shift");
var Task = require("./task");
var Medication = require("./medication");

var Patient = new Schema({
  key: { type: Number, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  appointments: {type: [Appointment], required: false, default: []},
  notes: {type: [Note], required: false, default: []},
  tasks: {type: [Task], required: false, default: []},
  medications: {type: [Medication], required: false, default: []},
  shifts: {type: [Shift], required: false, default: []}
});

Patient.pre('save', function(next) {
  var now = new Date();
  this.updated_at = now;
  if (!this.createdDate) this.createdDate = now;
  next();
});

module.exports = mongoose.model("Patient", Patient);
