//Creates a list of timecards in a table format.
//Hovering on any timecards reveals Edit and Delete buttons, for editing and deleting respectively
//Handle conditional redering for different circumstances: 
//database loading, timecard deletion doublecheck and no data to display
//displays total hours based on filtered timecards

import React from 'react'
import './Form-Orange/FormOrange.css';
import {prependPositiveZero, SORTING} from './helperFunctions';
import ButtonEdit from './../assets/BUTTONS/BUTTON_EDIT.png';
import ButtonDelete from './../assets/BUTTONS/BUTTON_DELETE.png';
import ButtonYes from './../assets/BUTTONS/BUTTON_YES.png';
import ButtonNo from './../assets/BUTTONS/BUTTON_NO.png';
import VerySmallButton from './VerySmallButton/VerySmallButton';
import axios from 'axios';
import {Icon} from "semantic-ui-react";


class Timecards extends React.Component {	
	constructor(props) {
		super(props);
		this.state = {
			rowKey: "",
			selected: false,
			deleting: false,
			deleted: false,
		};

		this.handlePointerEnter = this.handlePointerEnter.bind(this);
		this.handlePointerLeave = this.handlePointerLeave.bind(this);
		this.handleEditBtnClick = this.handleEditBtnClick.bind(this);
		this.handleDeleteBtnClick = this.handleDeleteBtnClick.bind(this);
		this.handleDeleteCancel = this.handleDeleteCancel.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleSort = this.handleSort.bind(this);
	}

	//handles Pointer Enter to select row
	handlePointerEnter(e) {
		e.preventDefault();
		const el = e.currentTarget;
		if(!this.state.deleting) {
			this.setState(() => {
				return {
					rowKey: el.getAttribute("id"),
					selected: true
				}
			});
		}
	}

	//handles Pointer Leave to unselect row
	handlePointerLeave(e) {
		e.preventDefault();
		const el = e.currentTarget;
		if(!this.state.deleting) {
			this.setState(() => {
				return {
					rowKey: "",
					selected: false
				}
			});
		}
	}

	//Redirect to TimesheetEdit on click
	handleEditBtnClick(e) {
		e.preventDefault();
		window.location.href = `/Timesheet/TimesheetEdit/${this.state.rowKey}`;
	}

	//Flags for deletion
	handleDeleteBtnClick(e) {
		e.preventDefault();
		this.setState(() => {
			return {
				deleting: true
			}
		})
	}

	//On cancel delete, unselect and unflag for deletion
	handleDeleteCancel(e) {
		this.setState(()=>{
			return {
				rowKey:"",
				selected: false,
				deleting: false
			}
		})

	}

	//Sends deletion request to the backend to delete timecard from database
	//Then resets flags
	async handleDelete(e) {
		try{
			this.setState({loading: true});
			const serverUri =
			process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";
			const response= await axios.delete(`${serverUri}/Timesheet/api/TimecardDelete/${this.state.rowKey}`);
			console.log("setting state delete...");
			this.setState(()=>{
				return {deleted: true}
			});
			setTimeout(()=>{
				this.setState(()=>{
					return {
						rowKey:"",
						selected: false,
						deleting: false,
						deleted: false
					}
				});
				this.props.onChange();
			}, 1500);
		}catch (error) {
			console.log("It fails: ", error);
		}
	}

	//Updates timecards list after deletion
	deletionUpdate() {
		this.setState(()=>{
			return {deleted: false}
		});
		this.props.onChange();		
	}

	//Let parent handle sort
	handleSort(e) {
		if(!this.props.loading)
			this.props.sort(e);
	}

	//Conditional rendering
	render() {		
		const {TimecardData, loading} = this.props;
		const timecardEntries= TimecardData.map(entry => {
			const full_name = entry.caretaker.firstName + " " + entry.caretaker.lastName;
			const dateIn = new Date(entry.timeIn);
			const dateOut = new Date(entry.timeOut);			

			return (
				<React.Fragment key= {entry._id}>
					<tr id={entry._id} style={(this.state.deleting && entry._id === this.state.rowKey)? {color: "red", fontWeight: "bold"} : {}}
						onPointerEnter={this.handlePointerEnter} onPointerLeave={this.handlePointerLeave}>
				        <td>
				        	<>
				        		{	
				        			(entry._id === this.state.rowKey && this.state.selected)?				        			
									<VerySmallButton button={ButtonEdit} onClick={this.handleEditBtnClick}/>
									:true	
				        		}
				        			{dateIn.getFullYear() + "/" + prependPositiveZero(dateIn.getMonth() + 1) + "/" + prependPositiveZero(dateIn.getDate())}
				        		
				        	</>
				        </td>
				        <td>{prependPositiveZero(dateIn.getHours()) + ":" + prependPositiveZero(dateIn.getMinutes())}</td>
				        <td>{prependPositiveZero(dateOut.getHours()) + ":" + prependPositiveZero(dateOut.getMinutes())}</td>
				        <td>
				        	<>
				        		{full_name}
				        		{	
				        			(entry._id === this.state.rowKey && this.state.selected)?			        			
									<VerySmallButton button={ButtonDelete} onClick={this.handleDeleteBtnClick}/>
									:true	
				        		}
				        	</>
				        </td>			        
					</tr>
					{
						(this.state.deleting && (entry._id === this.state.rowKey))?
						<tr id={entry._id + "a"}>
							<td colSpan="4">
								<div>
									<div>
										<p style={{textAlign:"center", width: "100%", color: "red"}}><strong>Are you sure you want to delete this timecard?</strong></p>
									</div>
									<div>
										<VerySmallButton button={ButtonNo} onClick={this.handleDeleteCancel}/>
										<VerySmallButton button={ButtonYes} onClick={this.handleDelete}/>
									</div>
								</div>
							</td>
						</tr>
						: true
					}
				</React.Fragment>
			)
		});

		const totalHours = TimecardData.reduce((sum, timecard)=> {
			const dateIn = new Date(timecard.timeIn);
			const dateOut = new Date(timecard.timeOut);						
			const hours = Math.floor((dateOut - dateIn) / (60 * 1000)) / 60;
			return(
				sum + hours
			)
		}, 0);

		let sortIcon ="";
		if(this.props.sortType === SORTING["ascend"])
			sortIcon = <Icon name="sort up"/>;
		else if(this.props.sortType === SORTING["descend"])
			sortIcon = <Icon name="sort down"/>;


		return (
			<div className="flex-container-horizontal ">
				{					
					<table className="stripedTable">
					    <thead className="background-AppGreen">
					      <tr className="text-white-bold" onClick={this.handleSort}>
					        <th name="date">Date{(this.props.sortedCol==="date")? sortIcon : ""}</th>
					        <th name="timein">Time In{(this.props.sortedCol==="timein")? sortIcon : ""}</th>
					        <th name="timeout">Time Out{(this.props.sortedCol==="timeout")? sortIcon : ""}</th>
					        <th name="caretaker">Caretaker{(this.props.sortedCol==="caretaker")? sortIcon : ""}</th>
					      </tr>
					    </thead>
					    <>
						    {(this.state.deleted)?
						    	<tbody>
						    		<tr>
										<td colSpan="4">
											<p className="alert-msg">The selected timecard is deleted.</p>
										</td>
									</tr>
								</tbody>
								:
							    <tbody>
							    	{
										(loading)? 				      	
											<tr>
												<td colSpan="4"><h2>Timecards loading...</h2></td>
											</tr>
											:
											<>
												{
													(TimecardData.length === 0)?
													<tr>
														<td colSpan="4"><h2>No timecards to display. Change filter.</h2></td>
													</tr>
													:
													timecardEntries
												}
											</>	
									}						
							    </tbody>
							}
					    </>
					    <tfoot className="background-AppOrange section-padding text-white-bold">
							<tr>												
								<td colSpan='4'>
								<div className="flex-container-horizontal">
									<span style={{marginRight: "10px"}}>Total Hours: </span>
									<input type="text" name="totalHours" value={totalHours.toFixed(2)} size="4" style={{textAlign: "center"}} disabled/>	
								</div>				
								</td>
							</tr>
					    </tfoot>
					</table>
				}
			</div>
		);
	}
}
export default Timecards;