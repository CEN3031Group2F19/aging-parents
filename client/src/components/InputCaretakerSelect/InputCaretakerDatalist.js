//Caretaker datalist component
//takes an array of object caretakers prop and an onChange prop
import React from 'react'
import { Input } from 'semantic-ui-react'

class InputCaretakerDatalist extends React.Component {
	onChange() {
		const value = this.input.value;
		this.props.onChange(value);
	}

	onClick() {
		const value = this.datalist.value;
		this.props.onChange(value);
	}

	render() {
		const {caretakers} = this.props;
		const caretakerList = caretakers.map(caretaker =>{
			return(
				<option key={caretaker._id} value ={caretaker.firstName + " " + caretaker.lastName} />
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