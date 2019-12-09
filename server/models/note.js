var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var Note = new Schema({
  key: { type: ObjectId, unique: true, required: true },
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
