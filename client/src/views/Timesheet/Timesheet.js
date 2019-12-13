//This is the whole Timesheet page.
//Functionalities, such as interactivity will be implemented later
import React, {Component} from 'react';
import Timecards from '../../components/Timecards';
import TimecardData from '../../components/TimecardData'; 
import icon from '../../assets/ICON_TIMESHEET_CLOCK.png'
import HeaderPage from '../../components/Header-Page/HeaderPage';
import CaretakerList from '../../components/InputCaretakerSelect/InputCaretakerDatalist';
import ButtonAdd from '../../assets/BUTTON_ADD.png'
import ButtonExport from '../../assets/BUTTON_EXPORT.png'
import BGImgClock from '../../assets/BG_WHITE_CLOCK_IMAGE.png'
import InputLabeledDateChange from '../../components/InputLabeled/InputLabeledDateChange';
import "../../components/Header-Page/HeaderPage.css";
import "./Timesheet.css";


class Timesheet extends Component {
	constructor(props) {
		super(props);	
		const now = new Date();
		const defaultWeek = new Date(now - (now.getDay() * 24 * 60 * 60 * 1000));	//Set to begining of week
		this.state = {
			week:defaultWeek,
			requestedDate: defaultWeek.toStringHTML(),
			inputDateType: "text",
			displayDate: formatDisplayDate(defaultWeek),													
			filteredCaretaker: "",							//default to all users
			filteredCaretakerList:TimecardData,
			dbTimecards: TimecardData,						//will be soon configured to pull from database
			filteredTimecards: []			
		}		
		this.handleFocusDate = this.handleFocusDate.bind(this);
		this.handleBlurDate = this.handleBlurDate.bind(this);
		this.handleChangeDate = this.handleChangeDate.bind(this);
		this.handleChangeFilteredCaretaker = this.handleChangeFilteredCaretaker.bind(this);
	}	

	handleChangeFilteredCaretaker(e) {
		let currValue = e.target.value;
		this.setState(() => {
			return {
				filteredCaretaker: currValue,
				filteredCaretakerList: this.filterTimecards(currValue, null)
			};
		});
	}

	filterTimecards(filteredCaretaker, inputDate) {
		return(this.state.dbTimecards.filter(timecard =>{
			let caretaker = !(filteredCaretaker) ||
				(timecard.first_name +" " + timecard.last_name).toLowerCase().indexOf(filteredCaretaker.toLowerCase()) >= 0;				
			let weekLastDay = (inputDate)? setBeginingOfWeek(inputDate) :
				 new Date(this.state.week.getFullYear(), this.state.week.getMonth(), this.state.week.getDate());
			weekLastDay.setDate(weekLastDay.getDate() + 6);
			let timecardDateValues= timecard.date_in.split('/');
			let timecardDateIn = new Date(parseInt("20" + timecardDateValues.pop()), parseInt(timecardDateValues.shift()) - 1, parseInt(timecardDateValues.shift()));
			return( 
				caretaker &&  
				timecardDateIn >= this.state.week && 
				timecardDateIn <= weekLastDay				 
			)})
		)
	}

	//Change input field to a date field on focus
	handleFocusDate(e) {
		let currValue = e.target.value;
		this.setState({
			inputDateType: "date",
		})
	}

	//Only accept date change if value if not null and <= today
	handleChangeDate(e) {
		let currValue = e.target.value;
		if(currValue && currValue <= (new Date()).toStringHTML()) {
			this.setState({
				week: setBeginingOfWeek(currValue),			
				inputDateType: "date",
				requestedDate: currValue,
				displayDate: formatDisplayDate(setBeginingOfWeek(currValue)),
				filteredCaretakerList: this.filterTimecards(this.state.filteredCaretaker, currValue)
			})
		}	
	}

	//Change input field back to date field on blur
	handleBlurDate(e) {
		let currValue = e.target.value;
		if(currValue && currValue <= (new Date()).toStringHTML()) {
			this.setState({
				week: setBeginingOfWeek(currValue),
				requestedDate: currValue,
				inputDateType: "text",
				displayDate: formatDisplayDate(setBeginingOfWeek(currValue)),
				filteredCaretakerList: this.filterTimecards(this.state.filteredCaretaker, currValue)
			})
		}
	}



	render(){
		return(
			<div className="flex-container-vertical">				
				<div className="Header-page">
					<HeaderPage	icon={icon} title='Timesheet'/>			
				</div>
				<InputLabeledDateChange divClassName="flex-container-horizontal flex-container-justify-center background-AppOrange section-padding text-white-bold" 
					labelClassName="labelpadded" labelValue="Week of:"
					type={this.state.inputDateType} min="2017-01-01" step="7" 
					value={(this.state.inputDateType === "date")? this.state.requestedDate : this.state.displayDate} 
					max={(new Date()).toStringHTML()} onFocus={this.handleFocusDate} onBlur={this.handleBlurDate} onChange={this.handleChangeDate}/>
				<div className="flex-container-horizontal flex-container-justify-center background-AppDarkGrey section-padding text-white-bold">
					<label className="labelpadded">Caretaker: </label>		
					<CaretakerList onChange={this.handleChangeFilteredCaretaker}/>
				</div>				
				<div>				
					<Timecards TimecardData = {this.state.filteredCaretakerList}/>
				</div>
				<div>			
					<div className="flex-container-horizontal section-whole-page flex-container-align-start background-AppWhite" 
						style={{backgroundImage: `url(${BGImgClock})`}} >
						<span style={{margin: "10px"}} className="flex-self-start">
							<a href="/Timesheet/TimesheetAdd">											        	
								<button className="form-small-button" style={{backgroundImage: `url(${ButtonAdd})`}}></button>
							</a>
						</span>	
						<span style={{margin: "10px"}} className="flex-self-start">	
							<button className="form-small-button" style={{backgroundImage: `url(${ButtonExport})`}}></button>
						</span>
					</div>	
				</div>
			</div>
		);
	}
}


Date.prototype.toStringHTML = function () {	
	return (this.toISOString().split('T')[0]);	
}

function formatDisplayDate(date) {
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
	return(day + ", " + ((date.getMonth() + 1 < 10)? "0" : "") + (date.getMonth()+1) + 
		"\/"+ ((date.getDate() < 10)? "0" : "") +date.getDate() + 
		"\/" + date.getFullYear()
	);
}

function formatDisplayDateToHTMLDate(dispDate) {
	// console.log(typeof dispDate);
	let dateValues= dispDate.split(' ')[1].split('/');
	return(dateValues.pop() + "-" + dateValues.join('-') );
}

function setBeginingOfWeek(date) {

	let pickedDate = (typeof date === 'string') ? 
		new Date(parseInt(date.substring(0,4)), 
		parseInt(date.substring(5,7)) - 1, 
		parseInt(date.substring(8,10))) :
		date;
	
	if(pickedDate.getDay() == 0) {
		return (pickedDate);
	} 
	pickedDate.setDate(pickedDate.getDate() - pickedDate.getDay());
	return(pickedDate);
}


export default Timesheet;