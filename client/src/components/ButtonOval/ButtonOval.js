//Button oval component
//Takes as props: type, big, disabled
//Changes button style when disabled

import React, {Component} from 'react'
import  './ButtonOval.css'


class ButtonOval extends Component {
	
	render() {
		const {type, big, disabled} = this.props;
		const style = (disabled)? {
			backgroundColor:"grey",
			textIndent: "0px"
		} : {
			width: (big)? "200px" : "100px",
			backgroundImage: `url(${this.props.image})`,
		}
		return (
			<button type= {type || "button"} className="form-small-button" 
			 style={style} disabled={disabled}>ADD</button>
		);
	}
}

export default ButtonOval;