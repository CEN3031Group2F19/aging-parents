import React, {Component} from 'react'
import  './InputLabeled.css'

class InputLabeled extends Component {
	
	render() {	
		const id = this.props.id || this.props.name;
		return (
			<div className="Row"> 
		  		<div className="Cell">
		  			<label htmlFor={id}>{this.props.name}</label>
		  		</div>
		    	<div className="Cell">
		    		<input type={this.props.type} id={id} name={this.props.name} className="cell-whole-width"/>
		    	</div>
			</div>	
		);
	}
}

export default InputLabeled;