//TimesheetEdit view
//Queries database for the id prop in order to get relevent information 
//to pass on as prop to FormOrange for editing

import React, {Component} from 'react';
import HeaderPage from '../../components/Header-Page/HeaderPage';
import FormOrange from '../../components/Form-Orange/FormOrange';
import icon from '../../assets/ICON_TIMESHEET_CLOCK.png'
import '../../components/Form-Orange/FormOrange.css';
import axios from 'axios';


class TimesheetEdit extends Component {	
	constructor(props) {
		super(props);
		this.state = {
			data: ""
		}
	}

	async componentDidMount() {
		try {
			const serverUri =
				process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";
			const response= await axios.get(`${serverUri}/Timesheet/api/Timecard/${this.props.id}`);
				this.setState(()=>{
				return {
					data: response.data
				}
			});		
		}catch(error){
			console.log(error);
		}
	}

	render(){
		if(!this.state.data)
			return (<h3>loading...</h3>);
		else
			return(			
				<div className="flex-container-vertical height-full-page background-AppOrange">			
					<nav>
						<HeaderPage title='Edit Time' />
					</nav>
					<main className="Form-orange box ">				
						<FormOrange timecard={this.state.data}/>
					</main>
				</div>
			);
	}
}

export default TimesheetEdit;