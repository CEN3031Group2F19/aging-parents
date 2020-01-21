//Very small button component
//takes an icon image prop and an optional onClick prop

import React, {Component} from 'react'

class VerySmallButton extends Component {
	handleClick(e){
		e.preventDefault();
		if(this.props.onClick)	this.props.onClick(e);
	}

	render(){
		const {button} = this.props;
		return(
			<span className="flex-self-start">															        	
				<button className="form-verysmall-button" style={{backgroundImage: `url(${button})`}}
					onClick={this.handleClick.bind(this)}></button>				
			</span>
		);
	}
}

export default VerySmallButton;