//This is a Form to take input data from user
//It handles both Adding and Editing of timecards
//Validates username upon entry and date range for timecard
//Allows user to enter a First Name and Last Name for first time User record with none
//Only allows editing of date and time, NOT the username
//To edit username on timecard, user must delete and reenter timecard

import React from 'react';
import CaretakerList from '../InputCaretakerSelect/InputCaretakerDatalist';
import Caretakers from '../Caretakers';
import ButtonAdd from '../../assets/BUTTONS/BUTTON_ADD.png';
import ButtonEdit from '../../assets/BUTTONS/BUTTON_EDIT.png';
import ButtonOval from '../ButtonOval/ButtonOval';
import InputLabeled from '../InputLabeled/InputLabeled';
import axios from 'axios';
import {getTotalHoursString} from '../helperFunctions';

class FormOrange extends React.Component {
	constructor(props){
		super(props);
		const today = new Date().toStringHTML();
		this.state = {
			date: today,
			minDate: "2017-01-01",
			maxDate: today,
			dateOutRange: false,
			timeIn: new Date().toStringTimeHTML(),
			timeOut: new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toStringTimeHTML(),
			username: "",
			firstName: "",
			lastName: "",
			id:"",
			validate: false,
			disabled: true,
			readOnly: false,
			error: false,
			success: false,
			editing: false
		}
		this.handleAddSubmit = this.handleAddSubmit.bind(this);	
		this.handleEditSubmit = this.handleEditSubmit.bind(this);
		this.handleChangeDate = this.handleChangeDate.bind(this);
		this.handleChangeTimeIn = this.handleChangeTimeIn.bind(this);
		this.handleChangeTimeOut = this.handleChangeTimeOut.bind(this);
		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
		this.handleChangeLastName = this.handleChangeLastName.bind(this);
	}

	//Settings for when editing timecard to query database for validation once component mounted
	componentDidMount() {
		if(this.props.timecard) {
			const propDate = new Date(this.props.timecard.timecard.timeIn);
			this.setState(()=>{
				return {
					date: propDate.toStringHTML(),
					timeIn: propDate.toStringTimeHTML(),
					timeOut: new Date(this.props.timecard.timecard.timeOut).toStringTimeHTML(),
					username: this.props.timecard.account.username,
					editing: true
				}
			});
			this.validate(this.props.timecard.account.username);
		}
	}

	//Does error checking upon Add submit, then send post request to database
	handleAddSubmit = async(e) => {	
		console.log("submitting...");
		e.preventDefault();

		if( this.state.dateOutRange || !this.state.validate || !this.state.username || !this.state.date 
			|| !this.state.timeIn || !this.state.timeOut || !this.state.id
			|| !this.state.firstName || !this.state.lastName) {
				this.setState({error: true});

			console.log("submitting error: ", this.state.error);
			return;
		}else {
			this.setState({error: false});
		}		
		try{
			const serverUri =
			process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";
			await axios.post(`${serverUri}/Timesheet/api/TimesheetAdd`, 
				{
					id: this.state.id,
					date: this.state.date,
					timeIn: this.state.timeIn,
					timeOut: this.state.timeOut,
					username: this.state.username,
					firstName: this.state.firstName,
					lastName: this.state.lastName					
				});	
			this.setState(()=>{return{success:true}});
			setTimeout(()=> {window.location.href=`/Timesheet`}, 1500);	
		}catch(error) {
			console.log("error status: ", error);			
		}
	}

	//Does error checking upon Edit submit, then send put request to database
	handleEditSubmit = async(e) => {	
		console.log("submitting...");
		e.preventDefault();

		if( this.state.dateOutRange || !this.state.validate || !this.state.username || !this.state.date 
			|| !this.state.timeIn || !this.state.timeOut || !this.state.id
			|| !this.state.firstName || !this.state.lastName) {
				this.setState({error: true});

			console.log("submitting error: ", this.state.error);
			return;
		}else {
			this.setState({error: false});
		}		
		try{
			const id = this.props.timecard.timecard._id;
			const serverUri =
			process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";
			await axios.put(`${serverUri}/Timesheet/api/TimesheetEdit/${id}`, 
				{
					date: this.state.date,
					timeIn: this.state.timeIn,
					timeOut: this.state.timeOut				
				});	
			this.setState(()=>{return{success:true}});
			setTimeout(()=> {window.location.href=`/Timesheet`}, 1500);	
		}catch(error) {
			console.log("error status: ", error);			
		}
	}

	//handles date change and checks whether date is out of range
	handleChangeDate(value) {
		this.setState({
				date: value
			});
		if(value && value >= this.state.minDate 
			&& value <= this.state.maxDate) {			
			this.setState({				
				dateOutRange: false
			});
		}else {
			this.setState({
				dateOutRange: true,				
			});
		}		
	}

	//handles time in change
	handleChangeTimeIn(value) {
		if(value) {
			this.setState({
				timeIn: value
			});
		}
	}

	//handles time out change
	handleChangeTimeOut(value) {
		if(value) {
			this.setState({
				timeOut: value
			});
		}
	}

	//handles username change and validates
	handleChangeUsername(value) {		
		this.setState({
			username: value
		});
		this.validate(value);
	}

	//handles first name change
	handleChangeFirstName(value) {
		this.setState({
			firstName: value
		});
	}

	//handles last name change
	handleChangeLastName(value) {
		this.setState({
			lastName: value
		});
	}

	//validates username against database
	validate = async (username) => {
		try {
			const serverUri =
			process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";
			const response = await axios.get(`${serverUri}/Timesheet/api/Validate`, {params : {
				username: username
			}});

			if(response.data) {
				this.setState({
					validate: true, 
					id: response.data
				});
				this.findUser(response.data)
			}else {
				this.setState({
					validate: false,
					firstName: "", 
					lastName: "",
					id:"",
					disabled: true
				});
			}
		} catch(error) {
			console.log(error);						
		}
	}

	//If username exists, find user associated with account id
	//If user a user record is associated with account, get first and last names
	//else user will have to enter first and last name
	findUser = async (id) => {	
		console.log("finding user...");
		try {
			const serverUri =
			process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";
			const response = await axios.get(`${serverUri}/Timesheet/api/FindUser`, {params : {
				id: id
			}});
			console.log("user found.");

			if(response.data) {
				this.setState({
					readOnly: true,
					firstName: response.data.firstName, 
					lastName: response.data.lastName
				});
			}else {
				this.setState({readOnly: false});				
			}
			this.setState({disabled: false});
		} catch(error) {
			console.log(error);			
		}
	}

	//conditional rendering
	render() {
		return(
			<div className="flex-container-vertical">
				<form method="post" onSubmit={(this.state.editing)? this.handleEditSubmit : this.handleAddSubmit} className="flex-container-horizontal">
					<div className="Table">	
						<div className="Body">	
							{
								(this.state.error) && 
								<div className="Table">
									<div className="Row flex-container-horizontal-wrap"> 		  															
						    			<p className="wholeRow">
						    				<small>All fields required</small>
						    			</p>						    		
						    		</div>
						    	</div>								
							}				
							<InputLabeled type="date" name="Date:" onChange={this.handleChangeDate} value={this.state.date}/>
							{
								(this.state.dateOutRange) &&
								<div className="Table">
									<div className="Row flex-container-horizontal-wrap"> 		  															
						    			<p className="wholeRow">
						    				<small>Date range: {this.state.minDate} to {this.state.maxDate}</small>
						    			</p>						    		
						    		</div>
						    	</div>
							}
							<InputLabeled type="time" name="Time In:" onChange={this.handleChangeTimeIn} value={this.state.timeIn}/>
					    	<InputLabeled type="time" name="Time Out:" onChange={this.handleChangeTimeOut} value={this.state.timeOut}/>
					    	<div className="Table">
								<div className="Row flex-container-horizontal-wrap"> 		  															
					    			<p className="wholeRow">
					    				<small style={{color:"green"}}>Total hours: {getTotalHoursString(this.state.timeIn, this.state.timeOut)}</small>
					    			</p>						    		
					    		</div>
					    	</div>					    	
					    	<InputLabeled type="text" name="Username:" onChange={this.handleChangeUsername} value={this.state.username} 
					    	readOnly={this.state.editing}/>				    	
					    	{(this.state.validate === true) ?
					    		<>
					    			{
					    				(!this.state.readOnly) &&
					    				<div className="Table">
											<div className="Row flex-container-horizontal-wrap"> 		  															
								    			<p className="wholeRow">
								    				<small>Enter first and last name</small>
								    			</p>						    		
								    		</div>
								    	</div>						    			
						    		}	
							    	<InputLabeled type="text" name="First Name:" onChange={this.handleChangeFirstName} 
							    		value={this.state.firstName} readOnly={this.state.readOnly}/>
							    	<InputLabeled type="text" name="Last Name:" onChange={this.handleChangeLastName} 
							    		value={this.state.lastName} readOnly={this.state.readOnly}/>
						    	</>
						    	:
						    	<div className="Table">
									<div className="Row flex-container-horizontal-wrap"> 
							    		{
							    			(this.state.username)?
							    			<p>
							    				<small>incorrect username</small>
							    			</p>
							    			:
							    			<p>
							    				<small>username required</small>
							    			</p>

						    			}
					    			</div>
						    	</div>			    		
						    }

						    <div className="Foot">
								<div className="Cell cell-whole-width">
						  			<ButtonOval type="submit"  image={(this.state.editing)? ButtonEdit : ButtonAdd} 
						  			link="/Timesheet/TimesheetAdd" disabled={this.state.disabled}/>
						  		</div>
							</div> 
					    </div> 
					</div> 
				</form>
				{
					(this.state.success) &&
					<div className="successMsg">
						<p><strong>Timecard submitted successfully!!</strong></p>
						<p><strong>Timesheet page is now loading...</strong></p>
					</div>
				}
			</div>
		);
	}		
}
export default FormOrange;