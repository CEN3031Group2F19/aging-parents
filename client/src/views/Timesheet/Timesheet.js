//This is the whole Timesheet page.
//Functionalities, such as interactivity will be implemented later
import React, {Component} from 'react';
import { Container, Segment, Header, Table } from 'semantic-ui-react';
import Timecards from '../../components/Timecards';
import TimecardData from '../../components/TimecardData'; 
import SearchBoxCustomLabeled from '../../components/SearchBoxCustomLabeled';
import CalendarCustomLabeled from '../../components/CalendarCustomLabeled';

class Timesheet extends Component {

	render(){
		return(
			<div>			
				<nav>						
					<Container fluid={true}>
						<Segment className='.borderless' padded= 'very'>						
							<Header size='huge' textAlign = 'center'>Timesheet</Header>	
						</Segment>	
					</Container>				
					<Table>
						<Table.Body>
							<Table.Row hey = 'search' textAlign = 'center' verticalAlign='middle'>
								<Table.Cell float='left'>
									<CalendarCustomLabeled labelAs = 'h4' placeholder='Week of...'/>
								</Table.Cell>
								<Table.Cell float='right'>
									<SearchBoxCustomLabeled labelAs = 'h4' float='right' label='Caretaker:' placeholder='Search caretakers...'/>								
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>
				</nav>
				<main>				
					<Timecards TimecardData = {TimecardData}/>
				</main>
			</div>

		);
	}
}

export default Timesheet;