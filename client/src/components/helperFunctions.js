//Helper functions used by many components

export function formatDisplayDateToHTMLDate(dispDate) {
	// console.log(typeof dispDate);
	let dateValues= dispDate.split(' ')[1].split('/');
	return(dateValues.pop() + "-" + dateValues.join('-') );
}

export function setBeginingOfWeek(date) {

	let pickedDate = (typeof date === 'string') ? 
		new Date(parseInt(date.substring(0,4)), 
		parseInt(date.substring(5,7)) - 1, 
		parseInt(date.substring(8,10))) :
		date;
	
	if(pickedDate.getDay() === 0) {
		return (pickedDate);
	} 
	pickedDate.setDate(pickedDate.getDate() - pickedDate.getDay());
	return(pickedDate);
}

export function prependPositiveZero(num) {
	return (num > 9 || num < 0)? "" + num : "0" + num;
}

Date.prototype.toStringHTML = function () {	
	return (this.getFullYear() + "-" + prependPositiveZero(this.getMonth() + 1) 
			+ "-" + prependPositiveZero(this.getDate()));	
}

Date.prototype.toStringTimeHTML = function () {	
	return(prependPositiveZero(this.getHours()) + ":" + prependPositiveZero(this.getMinutes()));
}

export function getTotalHoursString (timeIn, timeOut) {
	let timeInArr = timeIn.split(':');
	let timeOutArr = timeOut.split(':');
	let totalHours = (parseInt(timeOutArr[0]) < parseInt(timeInArr[0]))
				? parseInt(timeOutArr[0]) + 24 - parseInt(timeInArr[0])
				: parseInt(timeOutArr[0]) - parseInt(timeInArr[0]);
	let totalMins = (parseInt(timeOutArr[1]) < parseInt(timeInArr[1]))
				? parseInt(timeOutArr[1]) + 60 - parseInt(timeInArr[1])
				: parseInt(timeOutArr[1]) - parseInt(timeInArr[1]);
	return (totalHours + " hrs " + totalMins + " mins");
}

export function formatDisplayDate(date) {
	// console.log(typeof date);
	let day = "";
	switch (date.getDay()) {				
		case 0:
		    day = "Sunday";
		    break;
		case 1:
			day = "Monday";
			break;
		case 2:
			 day = "Tuesday";
			break;
		case 3:
			day = "Wednesday";
			break;
		case 4:
			day = "Thursday";
			break;
		case 5:
			day = "Friday";
			break;
		case 6:
		
			day = "Saturday";
	}
	return(day + ", " + prependPositiveZero(date.getMonth() + 1) + "/"
		+ prependPositiveZero(date.getDate()) + "/" + date.getFullYear());
}

export const SORTING = {
	none: 0,
	ascend: 1,
	descend: -1
}

export function compareAscend(a, b) {
	if(a < b)
		return -1;
	else if(a > b)
		return 1
	else
		return 0;
}