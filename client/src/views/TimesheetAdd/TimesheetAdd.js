import React, {Component} from 'react';
import HeaderPage from '../../components/Header-Page/HeaderPage';
import FormOrange from '../../components/Form-Orange/FormOrange';
import icon from '../../assets/ICON_TIMESHEET_CLOCK.png'
import '../../components/Form-Orange/FormOrange.css';

class TimesheetAdd extends Component {

	render(){
		return(
			<div className="flex-container-vertical height-full-page background-AppOrange">			
				<nav>
					<HeaderPage title='Add Time' />
				</nav>
				<main className="Form-orange box ">				
					<FormOrange />
				</main>
			</div>
		);
	}
}

export default TimesheetAdd;