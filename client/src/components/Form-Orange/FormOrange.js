//Creates a list of timecard in a table. Placement of Add Timecard button and pagination
import React from 'react'
import CaretakerList from '../InputCaretakerSelect/InputCaretakerDatalist'
import Caretakers from '../Caretakers'
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

//Still working on it. Wi

class FormOrange extends React.Component {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);		
	}

	handleSubmit(e) {
		e.preventDefault();
		window.location.href ="/Timesheet";
	}

	render() {
		return(
			<form method="post" onSubmit={this.handleSubmit}>
				<div className="Table">	
					<div className="Body">					
						<InputLabeled type="date" name="Date:"/>
						<InputLabeled type="time" name="Time In:"/>
				    	<InputLabeled type="time" name="Time Out:"/>
					    <div className="Row"> 
					  		<label className="Cell">Caretaker:</label>
					  		<div className="Cell">
					  			<CaretakerList Caretakers = {Caretakers}/>
					  		</div>
						</div>	
					    <div className="Foot">
							<div className="Cell cell-whole-width">
					  			<ButtonOval type="submit" image={ButtonAdd} link="/Timesheet/TimesheetAdd"/>
					  		</div>
						</div> 
				    </div> 
				</div> 
			</form>
		);
	}		
}
export default FormOrange;