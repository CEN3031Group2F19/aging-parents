//This is a Calendar component. It can be used in any page that needs a calendar box
//It can be customized by passing props such as, label, labelAs and placeholder
import React from 'react'
import {Label, Menu } from 'semantic-ui-react'


const CalendarCustomLabeled = (props) => (	
	<Menu floated={true}>
		<Label>			
			<Label.Detail as={props.labelAs || 'h4'}>{props.label || "Date:"}</Label.Detail>
		</Label>
		<div className="ui calendar" id="example1">
			<div className="ui input left icon">
				<i className="calendar icon"></i>
				<input type="text" placeholder={props.placeholder ||"Date/Time"}/>
			</div>
		</div>  		
  	</Menu>  	
)

export default CalendarCustomLabeled;