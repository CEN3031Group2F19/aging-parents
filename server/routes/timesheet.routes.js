//Handles requests for Timesheet api
//And queries and updates MongoDB

var express = require('express');
var router = express.Router();
var Timecard = require('../models/timecard');
var TimesheetUser = require('../models/timecardUser');
var Account = require('../models/account');

//Queries MongoDB database for all timecards for the requested week
router.get("/Timesheet/api/TimecardsWkly", function (req, res) {	
	let weekOf = new Date(req.query.weekOf + "T00:00");
	let endDate = new Date(weekOf);
	endDate.setDate(endDate.getDate() + 7);

	Timecard.find({"timeIn": {"$gte": weekOf, "$lt": endDate}})
		.populate('caretaker', '_id firstName lastName').exec(function (err, timecards) {
		if(err) console.log("Error with getting timecards", err);

		res.json(timecards);
		console.log('Server sent all weekly timecards request');
	});	
});

//Queries MongoDB database for a specific timecard and account,
// then return only specific fields of combined data 
router.get("/Timesheet/api/Timecard/:id", function (req, res) {	
	Timecard.findOne({_id: req.params.id})
		.populate('caretaker')
		.exec(function (err, timecard) {
		if(err) console.log("Error with getting timecard", err);
		Account.findOne({_id: timecard.caretaker.account},'username', function (error, acct) {
			if(error) console.log("Error with getting account username", error);
			res.json({timecard: timecard, account: acct});			
		});		
		console.log('Server sent timecard request');
	});	
});

//Queries MongoDB database for a specific account to validate username
router.get('/Timesheet/api/Validate', function (req, res) {
	Account.findOne({username: req.query.username}, function (err, acc) {
		if(err) { 
			console.log(err);
		}
		if(acc){ 
			console.log("valid account: ", acc)
			res.send(acc._id);
		}
		else
			res.send(null);
	});
});

//Queries MongoDB database for a specific TimesheetUser
router.get('/Timesheet/api/FindUser', function (req, res) {
	TimesheetUser.findOne({account: req.query.id}, function (err, user) {
		if(err) console.log(err);
		console.log("TimesheetUser found: ", user)
		res.json(user);
	});
});

//Edit a specific Timecard in MongoDB
router.put('/Timesheet/api/TimesheetEdit/:id', function (req, res) {
	let dateTimeIn = new Date(req.body.date + "T" + req.body.timeIn);
	let dateTimeOut = new Date(req.body.date + "T" + req.body.timeOut);

	if(dateTimeIn >= dateTimeOut) {
		dateTimeOut.setDate(dateTimeOut.getDate() + 1);
	}
	Timecard.findOneAndUpdate({_id: req.params.id}, 
		{
			$set:
				{
					timeIn: dateTimeIn,
					timeOut: dateTimeOut
				}
		},
		{new: true},
		function (err, timecard) {
			if(err) console.log(err);
			res.end("OK");
			console.log("timecard updated successfully: ", timecard);		
	});
})

//Create a Timecard in MongoDB 
//and if required TimesheetUser is not yet created, create one first
router.post('/Timesheet/api/TimesheetAdd', function (req, res) {
	let dateTimeIn = new Date(req.body.date + "T" + req.body.timeIn);
	let dateTimeOut = new Date(req.body.date + "T" + req.body.timeOut);

	if(dateTimeIn >= dateTimeOut) {
		dateTimeOut.setDate(dateTimeOut.getDate() + 1);
	}
	TimesheetUser.findOne({account: req.body.id}, function (err, user) {
		if(err) {
			console.log("beginning err:", err);
			res.send(err);			
		}

		let timesheetUser;
		if(!user) {
			timesheetUser = new TimesheetUser({
				account: req.body.id,
				firstName: req.body.firstName,
				lastName: req.body.lastName
			});
			timesheetUser.save(function (err, newUser) {				
				if(err) {
					console.log("newTimesheetUser err:", err);
				 	res.send(err);
				}
				console.log("new timesheet user created successfully: ", newUser);								
			});

		}else {
			timesheetUser = user;
			console.log("existing timesheetUser: ", timesheetUser);
		}
		var newTimecard = new Timecard({
				caretaker: timesheetUser._id,
				timeIn: dateTimeIn,
				timeOut: dateTimeOut
			});
		console.log("newTimecard", newTimecard);

		newTimecard.save(function (err, timecard) {
			if(err) {
				console.log("newTimecard error: ", err);
				res.send(err);
			}
		});

	});
	res.status(200);
	res.end("yes");
});

//Delete a specific Timecard from MongoDB
router.delete('/Timesheet/api/TimecardDelete/:id', function(req, res) {
	console.log("deleting timecard");
	Timecard.findOneAndDelete({_id:req.params.id}, function(err, timecard) {
		if(err) console.log(err);
		res.end("OK");
		console.log("timecard deleted", timecard);
	});
});

module.exports = router;