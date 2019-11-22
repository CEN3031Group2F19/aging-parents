//Creates a list of timecard in a table. Placement of Add Timecard button and pagination
import React from 'react'
import { Icon, Menu, Table, Button } from 'semantic-ui-react'

class Timecards extends React.Component {	
	render() {
		const {TimecardData} = this.props;
		const timecardEntries = TimecardData.map(entry => {
			const full_name = entry.first_name + '\xa0'  + entry.last_name;
			return (
				<Table.Row key= {entry.id}>
			        <Table.Cell>{entry.date_in}</Table.Cell>
			        <Table.Cell>{entry.time_in}</Table.Cell>
			        <Table.Cell>{entry.date_out}</Table.Cell>
			        <Table.Cell>{entry.time_out}</Table.Cell>
			        <Table.Cell>{full_name}</Table.Cell>
			        <Table.Cell>{entry.hours_worked}</Table.Cell>
				</Table.Row>
			)
		})
	
		return (
			<div>
				<Table celled>
				    <Table.Header>
				      <Table.Row textAlign = 'center'>
				        <Table.HeaderCell>Start Date</Table.HeaderCell>
				        <Table.HeaderCell>Start Time</Table.HeaderCell>
				        <Table.HeaderCell>End Date</Table.HeaderCell>
				        <Table.HeaderCell>End Time</Table.HeaderCell>
				        <Table.HeaderCell>Caretaker</Table.HeaderCell>
				        <Table.HeaderCell>Hours Worked</Table.HeaderCell>
				      </Table.Row>
				    </Table.Header>

				    <Table.Body>
				      {timecardEntries}
				    </Table.Body>

				    <Table.Footer>
						<Table.Row>												
							<Table.HeaderCell colSpan='6'>											        	
								<Button floated='left' color="blue" size="small">
									Add Timecard
								</Button>
													        	
								<Menu floated='right' pagination>
									<Menu.Item as='a' icon>
										<Icon name='chevron left' />
									</Menu.Item>
									<Menu.Item as='a'>1</Menu.Item>
									<Menu.Item as='a'>2</Menu.Item>
									<Menu.Item as='a'>3</Menu.Item>
									<Menu.Item as='a'>4</Menu.Item>
									<Menu.Item as='a' icon>
										<Icon name='chevron right' />
									</Menu.Item>
								</Menu>
							</Table.HeaderCell>
						</Table.Row>
				    </Table.Footer>
				</Table>
			</div>
		);
	}
}
export default Timecards;