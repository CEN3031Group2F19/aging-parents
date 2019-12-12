import React from 'react'
import { Input } from 'semantic-ui-react'

class InputCaretakerDatalist extends React.Component {
	render() {
		const caretakerList = this.props.caretakers.map(caretaker =>{
			return(
				<option id={caretaker.key} value={caretaker.userEmail} />
			);
		});

	  	return(
			<div>
				<Input 
					list='caretakerList' 
					placeholder='Select caretaker...' 
					size="mini" 
					onChange={this.props.onChange}
					ref={this.props.inputRef}
				/>    
				<datalist id='caretakerList'>					
				  	{caretakerList}
				</datalist>
			</div>	
		 );
	}
}
export default InputCaretakerDatalist;
