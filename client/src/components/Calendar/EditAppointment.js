import React from "react";
import { Redirect } from 'react-router-dom';
import { Confirm, Dropdown, Label, Input, TextArea, Button } from 'semantic-ui-react';
const enums = require('./CalendarEnums');
const axios = require("axios");

const obj = (k, v, t) => {
    return {key: k, value: v, text: t};
}

class EditAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: props.renderProps.params.key,
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            day: new Date().getDate(),
            title: '',
            location: '',
            hour: '12',
            minute: '00',
            amPm: 'AM',
            notes: '',
            open: false
        }

        this.getAppointment(props.renderProps.params.key);
    };

    getAppointment = async (id) => {
        const serverUri =
            process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";
        
        try {
          const response = await axios.get(
            `${serverUri}/Calendar/api/Appointments/${id}`);
    
            if (response.data !== "") {
                const appt = response.data;
    
                const date = new Date(appt.startTime);

                var mins = String(date.getMinutes());
                if (mins.length === 1)
                    mins = '0' + mins;

                var hrs = String(date.getHours() % 12);
                if (hrs === '0') hrs = 12;

                this.setState({
                    key: appt.key,
                    year: date.getFullYear(),
                    month: date.getMonth(),
                    day: date.getDate(),
                    title: appt.title,
                    location: appt.location,
                    hour: hrs,
                    minute: mins,
                    amPm: date.getHours() >= 12 ? 'PM' : 'AM',
                    notes: appt.notes
                });
            }
            else {
                throw new Error('Appointment not found.');
            }
        } catch(error) {
          console.log(error);
          this.setState({ key: null });
        }
      }

    UpdateButton_Click = async () => {
        try {
            const serverUri =
            process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

            var hour = 0;

            if (this.state.amPm === 'PM')
                hour = this.state.hour === '12' ? 12 : this.state.hour + 12;
            else 
                hour = this.state.hour === '12' ? 0 : this.state.hour;
            
            var startTime = new Date(this.state.year, this.state.month, this.state.day, hour, this.state.minute );

            const body = {
                key: this.state.key,
                title: this.state.title,
                location: this.state.location,
                startTime: startTime,
                endTime: startTime,
                notes: this.state.notes
            }
            await axios.post(`${serverUri}/Calendar/api/Update`, body);

        } catch (error) {
            console.log(error);
        } 
    }

    DeleteButton_Click = async () => {
        try {
            const serverUri =
            process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

            const body = {
                key: this.state.key
            }
            await axios.post(`${serverUri}/Calendar/api/Delete`, body);
            this.getAppointment(this.state.key);
        } catch (error) {
            console.log(error);
        } 

        this.setState({open: false});
    }

    render() {
        return(
            (this.state.key !== null) ?
            <>
            <table style={{ width: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center', tableLayout: 'fixed'}}>
                <tbody>
                <tr>
                    <td colSpan={4}>
                        <Label style={{width: '100%', fontSize: '16px'}}>
                            {enums.months[this.state.month]} {this.state.day}, {this.state.year}
                        </Label>
                    </td>
                </tr>
                <tr>
                    <td colSpan={4}>
                        <Input 
                            style={{ width: '100%' }} 
                            placeholder="Title"
                            onChange={(event) => this.setState(
                                { title: event.target.value })}
                            value={this.state.title}>
                        </Input>
                    </td>
                </tr>
                <tr>
                    <td colSpan={4}>
                        <Input 
                            style={{ width: '100%' }} 
                            placeholder='Location'
                            onChange={(event) => this.setState(
                                { location: event.target.value })}
                            value={this.state.location}>
                        </Input>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Label style={{ width: '100%',  }}>
                            Time
                        </Label>
                    </td>
                    <td><Dropdown 
                        
                        text={this.state.hour}
                        style={{ width: '100%', backgroundColor: '#fff', borderRadius: '5px', padding: '5px' }}
                        options={enums.hours.map(h =>
                            obj(enums.hours.indexOf(h), h, h)    
                        )}                                
                        onChange={(event) => this.setState(
                            { hour: event.target.innerText })}
                    /></td>
                    <td><Dropdown
                        scrolling 
                        text={this.state.minute}
                        style={{ width: '100%', backgroundColor: '#fff', borderRadius: '5px', padding: '5px' }} 
                        options={enums.minutes.map(m => 
                            obj(enums.minutes.indexOf(m), m, m)
                        )}                                
                        onChange={(event) => this.setState(
                            { minute: event.target.innerText })}
                    /></td>
                    <td><Dropdown  
                        scrolling
                        text={this.state.amPm}
                        style={{ width: '100%', backgroundColor: '#fff', borderRadius: '5px', padding: '5px' }} 
                        options={[{ key: 0, text: 'AM', value: 0 },
                                { key: 1, text: 'PM', value: 1 }]}                                
                        onChange={(event) => this.setState(
                            { amPm: event.target.innerText })}
                    /></td>
                </tr>
                <tr>
                    <td colSpan={4}>
                        <TextArea 
                            placeholder='Notes' 
                            onChange={(event) => this.setState(
                                { notes: event.target.value })}
                            value={this.state.notes}
                            style={{ resize: "none" }}
                    /></td>
                </tr>
                <tr>
                    <td colSpan={2}><Button style={{ width: '100%' }} onClick={this.UpdateButton_Click}>Save</Button></td>
                    <td colSpan={2}><Button style={{ width: '100%' }} onClick={() => {this.setState({open: true})}}>Delete</Button></td>
                </tr>
                </tbody>
            </table>
            <Confirm 
                open={this.state.open}
                onCancel={() => {this.setState({ open: false })}}
                onConfirm={this.DeleteButton_Click}
            />
            </> : 
            <Redirect to="/Calendar" />
        );
    }
}

export default EditAppointment;