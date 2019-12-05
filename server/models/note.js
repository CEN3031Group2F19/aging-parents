var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Note = new Schema({
  key: { type: Number, unique: true },
  title: { type: String, required: true },
  text: { type: String, default: '' }
});

Note.pre('save', function(next) {
  var now = new Date();
  this.updated_at = now;
  if (!this.createdDate) this.createdDate = now;
  next();
});

module.exports = mongoose.model("Note", Note);
