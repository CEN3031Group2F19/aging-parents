import React, {Component} from 'react'
import  './ButtonOval.css'



class ButtonOval extends Component {
	
	render() {
		const style = {
			width: (this.props.big)? "200px" : "100px",
			backgroundImage: `url(${this.props.image})`,
		}
		return (
			<button type= {this.props.type || "button"} className="form-small-button" style={style} ></button>
		);
	}
}

export default ButtonOval;

// <a href={this.props.link}>
// 	<button type= {this.props.type || "button"} className="form-small-button" style={{backgroundImage: `url(${this.props.image})`}}></button>
// </a>