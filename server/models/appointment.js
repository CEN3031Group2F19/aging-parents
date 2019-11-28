var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Appointment = new Schema({
  key: { type: Number, unique: true },
  title: { type: String, required: true },
  notes: {type: String, required: false, default: ''},
  reminderMinutes: {type: Number, required: false, default: 0},
  location: {type: String, required: false, default: ''},
  userEmail: {type: String, required: false, default: null},
  startTime: {type: Date, required: true},
  endTime: {type: Date, required: false, default: null}
});

Appointment.pre('save', function(next) {
  var now = new Date();
  this.updated_at = now;
  if (!this.createdDate) this.createdDate = now;
  next();
});

module.exports = mongoose.model("Appointment", Appointment);
