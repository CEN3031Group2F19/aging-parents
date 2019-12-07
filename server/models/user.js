var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Account = require("./account");
var Patient = require("./patient");

var User = new Schema({
  account: { type: Account, required: true },
  firstName: { type: String, required: false, default: ''},
  lastName: { type: String, required: false, default: ''},
  patients: { type: [Patient], required: false, default: [] }
});

module.exports = mongoose.model("User", User);
