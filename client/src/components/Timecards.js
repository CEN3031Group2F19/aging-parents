//Creates a list of timecard in a table. Placement of Add Timecard button and pagination
import React from 'react'
import './Form-Orange/FormOrange.css';

class Timecards extends React.Component {	
	render() {
		const {TimecardData} = this.props;
		const timecardEntries = TimecardData.map(entry => {
			const full_name = entry.first_name + " " + entry.last_name;
			return (
				<tr key= {entry.id}>
			        <td>{entry.date_in}</td>
			        <td>{entry.time_in}</td>
			        <td>{entry.time_out}</td>
			        <td>{full_name}</td>
				</tr>
			)
		});

		const totalHours = TimecardData.reduce((sum, timecard)=> {
			let [timeIn, period] = timecard.time_in.split(" ");
				timeIn = (period === "PM")? (parseInt(timeIn) + 12) : parseInt(timeIn);
			let [timeOut, period2] = timecard.time_out.split(" ");
				timeOut = (period2 === "PM")? (parseInt(timeOut) + 12) : parseInt(timeOut);
			let hours = (timeOut > timeIn)? (timeOut - timeIn) : ((24 + timeOut) - timeIn);
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