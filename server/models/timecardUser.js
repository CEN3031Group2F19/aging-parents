var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var timecardUserSchema = new Schema ({
	account: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Account',
		required: true
	},
	firstName: {
		type: String, 
		required: true
	},
	lastName: {
		type: String, 
		required: true
	},
});

module.exports = mongoose.model("timecardUser", timecardUserSchema);