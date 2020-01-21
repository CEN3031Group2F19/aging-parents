//Header Page creates the Header Page with the orange background
//Takes 4 props: title, icon, spacedOut and pageLink
//The prop title: displays title as an h1 header
//The prop icon: expects a file path for an icon image and displays it in front of the title
//The prop spacedOut: expects a boolean value and if true would add 4x more space between the icon and the title
//The prop pageLink: expects a link as an href to an <a> element

import React, {Component} from "react";
import "./HeaderPage.css";

class HeaderPage extends Component {
	render() {
		const isDisable = (this.props.pageLink) ? "" : "Is-disable";
		return(	
			<a href={this.props.pageLink || ""} className={isDisable}> 			
				<div className="Header-page Header-box">		
					{
						this.props.icon ? (
						<span className={"Header-box " + ((this.props.spacedOut)? "Margin-quad" : "Margin-single")}>			
							<img src={this.props.icon || ""} className="Header-logo" alt="icon"/>				
						 </span>) : (
						"")
					}
					<span>	
						<h1>{this.props.title}</h1>	
					</span>
			  	</div> 
		  	</a> 	
		);
	}
}
export default HeaderPage;