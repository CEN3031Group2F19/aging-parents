//This is the Timesheet view
// It queries all timecards from the database for the specified week,
//User able to filter by week annd caretaker. Caretaker field is a datalist not a selection list, thus user needs
//to clear field in order to see caretaker list
//User able to sort by any column. First click on a column
//sorts it in ascending order, 2nd click on the same column in descending order and 3rd click back to unsorted
//Click on Add button at the bottom to add new timecard
//Click on Export button to export current timesheet (filtered/unfiltered and/or sorted/unsorted) to csv file format

import React, {Component} from 'react';
import Timecards from '../../components/Timecards';
import icon from '../../assets/ICON_TIMESHEET_CLOCK.png'
import HeaderPage from '../../components/Header-Page/HeaderPage';
import CaretakerList from '../../components/InputCaretakerSelect/InputCaretakerDatalist';
import ButtonAdd from '../../assets/BUTTON_ADD.png';
import ButtonExport from '../../assets/BUTTON_EXPORT.png';
import BGImgClock from '../../assets/BG_WHITE_CLOCK_IMAGE.png';
import InputLabeledDateChange from '../../components/InputLabeled/InputLabeledDateChange';
import "../../components/Header-Page/HeaderPage.css";
import "./Timesheet.css";
import axios from 'axios';
import {setBeginingOfWeek, formatDisplayDate, SORTING, compareAscend, prependPositiveZero} from '../../components/helperFunctions';
import {CSVLink} from "react-csv";


class Timesheet extends Component {
	constructor(props) {
		super(props);	
		const now = new Date();
		const defaultWeek = new Date(now - (now.getDay() * 24 * 60 * 60 * 1000));
		this.state = {
			minDate: "2017-01-01",
			maxDate: new Date().toStringHTML(),
			week:defaultWeek,
			requestedDate: defaultWeek.toStringHTML(),
			inputDateType: "text",
			displayDate: formatDisplayDate(defaultWeek),													
			filteredCaretaker: "",							
			filteredCaretakerList:[],
			dbTimecards: [],					
			caretakers: [],
			loading: false,
			sortedCol: "",
			sortType: SORTING["none"],
			csvHeaders:[
				{label: "Date In", key: "dateIn"},
				{label: "Time In", key: "timeIn"},
				{label: "Date Out", key: "dateOut"},				
				{label: "Time Out", key: "timeOut"},
				{label: "Caretaker Full Name", key: "caretaker"},
				{label: "Caretaker First Name", key: "firstName"},
				{label: "Caretaker Last Name", key: "lastName"},
				{label: "Hours", key: "hours"}
			],
			csvData: []	
		}		
		this.handleFocusDate = this.handleFocusDate.bind(this);
		this.handleBlurDate = this.handleBlurDate.bind(this);
		this.handleChangeDate = this.handleChangeDate.bind(this);
		this.handleChangeFilteredCaretaker = this.handleChangeFilteredCaretaker.bind(this);
		this.handleTimecardsChange = this.handleTimecardsChange.bind(this);
		this.handleSorting = this.handleSorting.bind(this);
		this.onDownload = this.onDownload.bind(this);
	}

	//Queries database once component mount
	componentDidMount() {		
		this.dbAllWklyTimecards(this.state.week.toStringHTML())
			.then(data => this.setState(()=>{return{ filteredCaretakerList: data }}))
			.catch(error => console.log(error));
	}

	//Sends request to backend to get weekly timecards
	async dbAllWklyTimecards(week) {
		try{
			this.setState({loading: true});
			const serverUri =
			process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";
			const response= await axios.get(`${serverUri}/Timesheet/api/TimecardsWkly`, {params : {
				weekOf: week
			}});

			this.setState(()=>{
				return {				
					dbTimecards: response.data,
					caretakers: response.data.reduce((arr,entry) => {
						if(arr.length === 0 || !arr.find(arrElement => arrElement._id === entry.caretaker._id)) {
							arr.push(entry.caretaker);
						}
						return arr;
					}, []),
					loading: false
				}			
			});
			return response.data;
		}catch (error) {
			console.log("It fails: ", error);
		}
	}

	//handles filter for caretaker field
	handleChangeFilteredCaretaker(e) {
		let currValue = e.target.value;
		this.setState(() => {
			return {
				filteredCaretaker: currValue				
			};
		});
		this.filterTimecards(currValue, this.state.dbTimecards);
	}

	//filters timesheet based on caretaker and cancel sorting
	filterTimecards(caretaker, timecards) {		
		this.setState(()=>{
			return {
				filteredCaretakerList: timecards.filter(timecard => {
				return(
					!(caretaker) ||
					(timecard.caretaker.firstName +" " + timecard.caretaker.lastName).toLowerCase().indexOf(caretaker.toLowerCase()) >= 0
				)
			}),
				sortedCol: "",
				sortType: SORTING["none"]
			}
		});				
	}


	//Changes "Week of" input text field to a date field on focus
	handleFocusDate(e) {
		this.setState({
			inputDateType: "date",
		})
	}

	//Allows user to change date
	//Call for datase query only if date value is not null 
	//and is within range of min date and max date, and if currValue differs from previous value
	handleChangeDate(e) {
		const currValue = e.target.value;
		const beginWeek = setBeginingOfWeek(currValue)
		this.setState(()=>{
			return {								
				requestedDate: currValue,
				displayDate: formatDisplayDate(setBeginingOfWeek(currValue))
			}
		});

		if(currValue && currValue <= this.state.maxDate && currValue >= this.state.minDate
			&& (this.state.week < beginWeek || this.state.week > beginWeek)){
			this.setState(()=>{
				return {
					week: beginWeek
				}
			});
			this.dbAllWklyTimecards(beginWeek.toStringHTML())
				.then(data => {this.filterTimecards(this.state.filteredCaretaker, data)})
				.catch(error => {console.log(error)});
		}		
	}

	//Changes input date field back to input text field on blur
	//if input date doesn't meet criteria above, it is switched back to previous value
	handleBlurDate(e) {
		this.setState(()=>{
			return {
				requestedDate: this.state.week.toStringHTML(),
				inputDateType: "text",
				displayDate: formatDisplayDate(this.state.week)
			}
		})
		
	}

	//Queries database on change in Timecard component
	handleTimecardsChange() {
		this.dbAllWklyTimecards(this.state.week.toStringHTML())
				.then(data => {this.filterTimecards(this.state.filteredCaretaker, data)})
				.catch(error => {console.log(error)});
	}

	//Unsorts if the clicked column was sorted in descending order
	//Else Sorts in descending order, if the clicked column was sorted in ascending order
	//Else Sorts in ascending order
	handleSorting(e) {
		e.preventDefault();
		const element = (e.target.nodeName === "I")? e.target.parentNode : e.target;
		const val = element.getAttribute("name");	
		if(this.state.sortedCol === val && this.state.sortType < 0) {
			this.setState(()=>{
				return{
					sortedCol: "",
					sortType: SORTING["none"]
				}
			});
			this.filterTimecards(this.state.filteredCaretaker, this.state.dbTimecards);
		}else if(this.state.sortedCol === val && this.state.sortType > 0){
			this.sortData(val, SORTING["descend"]);		
			this.setState(()=>{return{sortType: SORTING["descend"]}});
		}else {
			this.sortData(val, SORTING["ascend"]);
			this.setState(()=>{
				return{
					sortedCol: val,
					sortType: SORTING["ascend"]
				}
			});
		}
	}

	//The actual function: Sorts data in ascending or descending order
	sortData(val, sortType) {
		this.setState(()=>{
			return{
				filteredCaretakerList: this.state.filteredCaretakerList.concat().sort(function(a, b) {
					let valueA,	valueB;
					switch (val) {
						case "date":
							valueA = new Date(a.timeIn).toStringHTML();
							valueB = new Date(b.timeIn).toStringHTML();
							break;
						case "timein":
							valueA = new Date(a.timeIn).toStringTimeHTML();
							valueB = new Date(b.timeIn).toStringTimeHTML();
							break;
						case "timeout":
							valueA = new Date(a.timeOut).toStringTimeHTML();
							valueB = new Date(b.timeOut).toStringTimeHTML();
							break;						
						case "caretaker":
							valueA = a.caretaker.firstName + " " + a.caretaker.lastName;
							valueB = b.caretaker.firstName + " " + b.caretaker.lastName;
							break;						
						default:
							return 0;
					}
					return (sortType === SORTING["ascend"])? compareAscend(valueA, valueB) : compareAscend(valueB, valueA);
				})
			}
		})
	}

	//Prepare filtered timecard list for downclick once Export button clicked
	onDownload() {
		this.setState({			
			csvData: this.state.filteredCaretakerList.map(data => {
				const caretaker = data.caretaker.firstName + " " + data.caretaker.lastName;
				const date_in = new Date(data.timeIn);
				const date_out = new Date(data.timeOut);
				const dateIn = date_in.getFullYear() + "/" + prependPositiveZero(date_in.getMonth() + 1) + "/" + prependPositiveZero(date_in.getDate());
				const timeIn = prependPositiveZero(date_in.getHours()) + ":" + prependPositiveZero(date_in.getMinutes());
				const dateOut= date_out.getFullYear() + "/" + prependPositiveZero(date_out.getMonth() + 1) + "/" + prependPositiveZero(date_out.getDate());
				const timeOut = prependPositiveZero(date_out.getHours()) + ":" + prependPositiveZero(date_out.getMinutes());
				const hours = (Math.floor((date_out - date_in) / (60 * 1000)) / 60).toFixed(2);

				return({
					dateIn: dateIn,
					timeIn: timeIn,
					dateOut: dateOut,
					timeOut: timeOut,
					caretaker: caretaker,
					firstName: data.caretaker.firstName,
					lastName: data.caretaker.lastName,
					hours: hours
				});
			})
		});
	}


	render(){
		return(	
			<div className="flex-container-vertical">				
				<div className="Header-page">
					<HeaderPage	icon={icon} title='Timesheet'/>			
				</div>
				<InputLabeledDateChange divClassName="flex-container-horizontal flex-container-justify-center background-AppOrange section-padding text-white-bold" 
					labelClassName="labelpadded" labelValue="Week of:"
					type={this.state.inputDateType} min={this.state.minDate} step="7" 
					value={(this.state.inputDateType === "date")? this.state.requestedDate : this.state.displayDate} 
					max={this.state.maxDate} onFocus={this.handleFocusDate} onBlur={this.handleBlurDate} onChange={this.handleChangeDate}/>
				<div className="flex-container-horizontal flex-container-justify-center background-AppDarkGrey section-padding text-white-bold">
					<label className="labelpadded">Caretaker: </label>		
					<CaretakerList caretakers={this.state.caretakers} onChange={this.handleChangeFilteredCaretaker} onClick={this.handleChangeFilteredCaretaker}/>
				</div>				
				<div>				
					<Timecards TimecardData={this.state.filteredCaretakerList} loading={this.state.loading} 
						onChange={this.handleTimecardsChange} sort={this.handleSorting}
						sortedCol={this.state.sortedCol} sortType={this.state.sortType}/>
				</div>
				<div>			
					<div className="flex-container-horizontal section-whole-page flex-container-align-start background-AppWhite" 
						style={{backgroundImage: `url(${BGImgClock})`}} >
						<span style={{margin: "10px"}} className="flex-self-start">
							<a href="/Timesheet/TimesheetAdd">											        	
								<button className="form-small-button" style={{backgroundImage: `url(${ButtonAdd})`}}></button>
							</a>
						</span>	
						<span style={{margin: "10px"}} className="flex-self-start">	
							<CSVLink data={this.state.csvData} headers={this.state.csvHeaders} 
								filename={"Timesheet_Week" + this.state.week.toStringHTML() + ".csv"}>						
								<button className="form-small-button" style={{backgroundImage: `url(${ButtonExport})`}} onClick={this.onDownload}></button>
							</CSVLink>							
						</span>
					</div>	
				</div>
			</div>
		);
	}
}

export default Timesheet;