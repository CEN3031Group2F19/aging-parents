import React, {Component} from 'react';
import HeaderPage from '../../components/Header-Page/HeaderPage';
import FormOrange from '../../components/Form-Orange/FormOrange';
import icon from '../../assets/ICON_TIMESHEET_CLOCK.png'
import '../../components/Form-Orange/FormOrange.css';
const axios = require("axios");

class TimesheetAdd extends Component {
	constructor(props) {
		super(props);	
		this.state = {
			caretakers: []
		}

		this.populateCaretakers();
	};

	populateCaretakers = async () => {
		const serverUri =
		process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";
	
		try {
		const response = await axios.get(
			`${serverUri}/Timesheet/api/Shifts`
		);
	
		var dbShifts = [];
	
		response.data.forEach(el => {
			dbShifts.splice(0, 0, { 
				key: el.key, 
				userEmail: el.userEmail, 
				timeIn: el.timeIn, 
				timeOut: el.timeOut  
			});
		});
	
		this.setState({ caretakers: [...dbShifts]});
		} catch (error) {
			console.log(error);
		}
	}

	render(){
		return(
			<div className="flex-container-vertical height-full-page background-AppOrange">			
				<nav>
					<HeaderPage title='Add Time' />
				</nav>
				<main className="Form-orange box ">				
					<FormOrange caretakers={this.state.caretakers} />
				</main>
			</div>
		);
	}
}

export default TimesheetAdd;