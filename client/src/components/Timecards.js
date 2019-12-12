//Creates a list of timecard in a table. Placement of Add Timecard button and pagination
import React from 'react'
import './Form-Orange/FormOrange.css';

class Timecards extends React.Component {	
	render() {
		const {TimecardData} = this.props;
		const timecardEntries = TimecardData.map(entry => {
			return (
				<tr key={entry.key}>
			        <td>{new Date(entry.timeIn).toLocaleDateString()}</td>
			        <td>{new Date(entry.timeIn).toLocaleTimeString()}</td>
			        <td>{new Date(entry.timeOut).toLocaleTimeString()}</td>
			        <td>{entry.userEmail}</td>
				</tr>
			)
		});

		const totalHours = TimecardData.reduce((sum, timecard)=> {
			let milliseconds = new Date(timecard.timeOut).getTime() - new Date(timecard.timeIn).getTime();
			let hours = milliseconds / (1000 * 60 * 60) // milliseconds/sec/minute
			return(
				sum + hours
			)
		}, 0);

	
		return (
			<div className="flex-container-horizontal ">
				<table className="stripedTable flex-items-wholeWidth">
				    <thead className="background-AppGreen">
				      <tr className="text-white-bold">
				        <th>Date</th>
				        <th>Time In</th>
				        <th>Time Out</th>
				        <th>Caretaker</th>
				      </tr>
				    </thead>

				    <tbody>
				      {timecardEntries}
				    </tbody>

				    <tfoot className="background-AppOrange section-padding text-white-bold">
						<tr>												
							<td colSpan='4'>
							<div className="flex-container-horizontal">
								<span style={{marginRight: "10px"}}>Total Hours: </span>
								<input type="text" name="totalHours" value={totalHours} size="4" style={{textAlign: "center"}} disabled/>	
							</div>				
							</td>
						</tr>
				    </tfoot>
				</table>
			</div>
		);
	}
}
export default Timecards;