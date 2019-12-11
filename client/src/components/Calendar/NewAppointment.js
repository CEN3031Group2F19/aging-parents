import React from "react";
import { Dropdown, Label, Input, TextArea, Button } from 'semantic-ui-react';
const enums = require('./CalendarEnums');
const axios = require("axios");

const obj = (k, v, t) => {
    return {key: k, value: v, text: t};
}

class NewAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: props.year,
            month: props.month,
            day: props.day,
            title: '',
            location: '',
            hour: '12',
            minute: '00',
            amPm: 'AM',
            notes: ''
        }
    };

    AddButton_Click = async () => {

        console.log(this.state)
        try {
            const serverUri =
            process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

            var hour = this.state.hour.substr(0, 2);

            if (this.state.amPm === 'PM')
                hour = hour === '12' ? 12 : hour + 12;
            else 
                hour = hour === '12' ? 0 : hour;
            
            var startTime = new Date(this.state.year, this.state.month, this.state.day, hour, this.state.minute.substr(0, 2) );

            const body = {
                title: this.state.title,
                location: this.state.location,
                startTime: startTime,
                endTime: startTime,
                notes: this.state.notes
            }

            console.log(body)

            await axios.post(`${serverUri}/Calendar/api/Add`, body);

            this.setState( {
                title: '',
                location: '',
                hour: '12',
                minute: '00',
                amPm: 'AM',
                notes: ''
            });
        } catch (error) {
            console.log(error);
        } 
    }

    render() {
        return(
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
                            scrolling
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
                    <td colSpan={4}><Button style={{ width: '100%' }} onClick={this.AddButton_Click}>Add</Button></td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default NewAppointment;