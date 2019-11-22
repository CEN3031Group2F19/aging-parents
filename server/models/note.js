var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Note = new Schema({
  noteId: { type: Number, unique: true },
  patientId: { type: Number, required: true },
  username: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  title: { type: String, required: true },
  content: { type: String, default: '' }
});

module.exports = mongoose.model("Note", Note);
