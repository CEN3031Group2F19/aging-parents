//DownloadTimesheetCSV component takes a timesheet list and week as props
//Once user clicks on the Export button, 
//the current timesheet (filtered/unfiltered and/or sorted/unsorted) is exported to a csv file format for download

import  React, {Component} from 'react';
import ButtonExport from '../../assets/BUTTON_EXPORT.png';
import {CSVLink} from "react-csv";
import {prependPositiveZero} from '../helperFunctions';

class DownloadTimesheetCSV extends Component {
	
	constructor(props) {
		super(props);
		this.state= {
			headers:[
				{label: "Date In", key: "dateIn"},
				{label: "Time In", key: "timeIn"},
				{label: "Date Out", key: "dateOut"},				
				{label: "Time Out", key: "timeOut"},
				{label: "Caretaker Full Name", key: "caretaker"},
				{label: "Caretaker First Name", key: "firstName"},
				{label: "Caretaker Last Name", key: "lastName"},
				{label: "Hours", key: "hours"}
			]
		}
	}

	render(){
		const csvData= this.props.list.map(data => {
			const caretaker = data.caretaker.firstName + " " + data.caretaker.lastName;
			const date_in = new Date(data.timeIn);
			const date_out = new Date(data.timeOut);
			const dateIn = date_in.getFullYear() + "/" + prependPositiveZero(date_in.getMonth() + 1) + "/" + prependPositiveZero(date_in.getDate());
			const timeIn = prependPositiveZero(date_in.getHours()) + ":" + prependPositiveZero(date_in.getMinutes());
			const dateOut= date_out.getFullYear() + "/" + prependPositiveZero(date_out.getMonth() + 1) + "/" + prependPositiveZero(date_out.getDate());
			const timeOut = prependPositiveZero(date_out.getHours()) + ":" + prependPositiveZero(date_out.getMinutes());
			const hours = (Math.floor((date_out - date_in) / (60 * 1000)) / 60).toFixed(2);

			return({
				dateIn: dateIn,
				timeIn: timeIn,
				dateOut: dateOut,
				timeOut: timeOut,
				caretaker: caretaker,
				firstName: data.caretaker.firstName,
				lastName: data.caretaker.lastName,
				hours: hours
			})
		});

		return(
			<CSVLink data={csvData} headers={this.state.csvHeaders} 
				filename={"Timesheet_Week" + this.props.week + ".csv"}>						
				<button className="form-small-button" style={{backgroundImage: `url(${ButtonExport})`}}></button>
			</CSVLink>
		);
	}
}

export default DownloadTimesheetCSV;