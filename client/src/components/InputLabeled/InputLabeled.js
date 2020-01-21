//Labeled input component
//Takes following props: id, name, type, readOnly, value, onChange and onBlur
//The type prop allows the selection of different type of input

import React, {Component} from 'react'
import  './InputLabeled.css'

class InputLabeled extends Component {
	onChange() {
		const value = this.refInput.value;
		this.props.onChange(value);
	}

	onBlur(e) {
		e.preventDefault();
		if(this.props.onBlur) {
			this.props.onBlur();
		}
	}

	render() {	
		const id = this.props.id || this.props.name;
		return (
			<div className="Row flex-container-horizontal-wrap"> 
		  		<div className="Cell">
		  			<label htmlFor={id}>{this.props.name}</label>
		  		</div>
		    	<div className="Cell">
		    		<input type={this.props.type} id={id} name={this.props.name} 
		    		readOnly={(this.props.readOnly)? true : false}
		    		ref={(value=> {this.refInput = value})} onChange={this.onChange.bind(this)} 
		    		onBlur={this.onBlur.bind(this)}
		    		className="cell-whole-width" value={this.props.value}/>
		    	</div>
			</div>	
		);
	}
}

export default InputLabeled;