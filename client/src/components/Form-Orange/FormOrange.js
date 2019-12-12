//Creates a list of timecard in a table. Placement of Add Timecard button and pagination
import React from 'react';
import CaretakerList from '../InputCaretakerSelect/InputCaretakerDatalist'
import '../Form-Orange/FormOrange.css';
// import ButtonAdd from '../../assets/BUTTONS/BUTTON_ADD.png'
// import ButtonCreate from '../../assets/BUTTONS/BUTTON_CREATE.png'
// import ButtonDelete from '../../assets/BUTTONS/BUTTON_DELETE.png'
// import ButtonEdit from '../../assets/BUTTONS/BUTTON_EDIT.png'
// import ButtonExport from '../../assets/BUTTONS/BUTTON_EXPORT.png'
// import ButtonNewMedication from '../../assets/BUTTONS/BUTTON_NEWMEDICATION.png'
import ButtonAdd from '../../assets/BUTTON_ADD.png'
import ButtonOval from '../ButtonOval/ButtonOval'
import InputLabeled from '../InputLabeled/InputLabeled'
import { Input } from 'semantic-ui-react'
const axios = require("axios");
//Still working on it. Wi

class FormOrange extends React.Component {	
	constructor(props){
		super(props);
		this.state = {
			userEmail: '',
			date: '',
			timeIn: '',
			timeOut: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this);		
	}

	handleSubmit(e) {
		e.preventDefault();
		window.location.href ="/Timesheet";
	}

	AddBtn_onClick = async () => {  
		console.log('werkin')
		console.log(this.state);

		try {
			const serverUri =
			process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

			this.state.date.split('-', '/', '\\');
			var timeIn = new Date(this.state.date);
			var timeOut = new Date(this.state.date);

			console.log(timeIn);
			console.log(timeOut);

			await axios.post(`${serverUri}/TImesheet/api/Add`, { 
				userEmail: this.state.userEmail,
				timeIn: timeIn,
				timeOut: timeOut
			});

		} catch (error) {
			console.log(error);
		}
	};

	render() {
		return(
			<form method="post" onSubmit={this.handleSubmit}>
				<div className="Table">	
					<div className="Body">					
						{/* <InputLabeled name="Date:" onChange={e => this.setState({date: e.target.value})}/>
						<InputLabeled name="Time In:" onChange={e => this.setState({timeIn: e.target.value})}/>
				    	<InputLabeled name="Time Out:" onChange={e => this.setState({timeOut: e.target.value})}/> */}
						<Input 
							placeholder='Date' 
							style={{display: 'block'}} 
							onChange={e => this.setState({date: e.target.value})}/>
						<Input 
							placeholder='Time In' 
							style={{display: 'block'}} 
							onChange={e => this.setState({timeIn: e.target.value})}/>
						<Input 
							placeholder='Time Out' 
							style={{display: 'block'}} 
							onChange={e => this.setState({timeOut: e.target.value})}/>
					    {/* <div className="Row"> 
					  		<label className="Cell">Caretaker:</label>
					  		<div className="Cell">
								<Input 
									caretakers={this.props.caretakers}
									onChange={e => this.setState({userEmail: e.target.value})}
								/>
					  		</div>
						</div>	 */}
						<Input 
							placeholder='User Email' 
							style={{display: 'block'}} 
							onChange={e => this.setState({userEmail: e.target.value})}/>
					    <div className="Foot">
							<div className="Cell cell-whole-width">
								  <ButtonOval 
								  image={ButtonAdd} 
								  onClick={this.AddBtn_onClick}
								  />
					  		</div>
						</div> 
				    </div> 
				</div> 
			</form>
		);
	}		
}
export default FormOrange;