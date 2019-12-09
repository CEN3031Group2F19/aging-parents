import React from 'react'
import { Input } from 'semantic-ui-react'
import Caretakers from '../../components/Caretakers'

class InputCaretakerDatalist extends React.Component {
	render() {
		const caretakerList = Caretakers.map(caretaker =>{
			return(
				<option key={caretaker.id} value ={caretaker.first_name + " " + caretaker.last_name} />
			);
		});

	  	return(
			<div>
				<Input list='caretakerList' placeholder='Select caretaker...' size="mini" onChange={this.props.onChange}/>    
				<datalist id='caretakerList'>					
				  	{caretakerList}
				</datalist>
			</div>	
		 );
	}
}
export default InputCaretakerDatalist;
