var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TimecardSchema = new Schema({
	caretaker: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'timecardUser',
		required: true
	},
	timeIn: {
		type: Date,
		required: true		
	},
	timeOut: {
		type: Date,
		required: true
	}
});

module.exports = mongoose.model("Timecard", TimecardSchema);