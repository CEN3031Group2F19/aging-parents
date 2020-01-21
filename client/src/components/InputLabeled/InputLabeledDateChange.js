//InputLabeledDateChange component
//Takes as props: divClassName, labelClassName, labelValue, type, 
//inputClassName, min, step, max, defaultValue, value, onChange, onBlur and onFocus
//Allows great flexibility to change both input and label

import React from 'react';

class InputLabeledDateChange extends React.Component {
	render(){
		return (
			<div className={this.props.divClassName}>
				<label className={this.props.labelClassName}>{this.props.labelValue}</label>
				<input type={this.props.type} className={this.props.inputClassName} min={this.props.min} step={this.props.step} max={this.props.max} 
					defaultValue={this.props.defaultValue} value={this.props.value}  
					onChange={this.props.onChange} onBlur={this.props.onBlur} onFocus={this.props.onFocus}/>					
			</div>

		);
	}
}

export default InputLabeledDateChange;