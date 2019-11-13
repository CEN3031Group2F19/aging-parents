//This is a Search box component. It can be used in any page that needs a search box
//It can be customized by passing props such as, label, labelAs, icon and placeholder
import React from 'react'
import { Input, Label, Menu } from 'semantic-ui-react'


const SearchBoxUsers = (props) => (
	
	<Menu floated={props.float || "center"}>		
		<Label>			
			<Label.Detail as={props.labelAs || 'h4'}>{props.label || "Users:"}</Label.Detail>
		</Label>
  		<Input icon={props.icon || 'users'} iconPosition='left' placeholder={props.placeholder ||'Search users...'} />
  	</Menu>  	
)

export default SearchBoxUsers;