import React from 'react';
import './Medications.css';
import { Select, Table, TableHeader, TableBody, TableRow, TableCell, Label, Form, Button, TextArea, Input, Dropdown } from 'semantic-ui-react';
const axios = require("axios");

const frequencyOptions = [
    {key: 0, text: '', value: 'None'},
    {key: 1, text: 'Daily', value: 'Daily'},
    {key: 2, text: 'Weekly', value: 'Weekly'},
    {key: 3, text: 'Biweekly', value: 'Biweekly'},
    {key: 4, text: 'Monthly', value: 'Monthly'},
    {key: 5, text: 'Sundays', value: 'Sundays'},
    {key: 6, text: 'Mondays', value: 'Mondays'},
    {key: 7, text: 'Tuesdays', value: 'Tuesdays'},
    {key: 8, text: 'Wednesdays', value: 'Wednesdays'},
    {key: 9, text: 'Thursdays', value: 'Thursdays'},
    {key: 10, text: 'Fridays', value: 'Fridays'},
    {key: 11, text: 'Saturdays', value: 'Saturdays'}
];

const timeOptions = [
    {key: 0, text: '', value: 'None'},
    {key: 1, text: 'Morning', value: 'Morning'},
    {key: 2, text: 'Afternoon', value: 'Afternoon'},
    {key: 3, text: 'Evening', value: 'Evening'}
]

class NewMedication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            frequency: '',
            timeOfDay: '',
            pharmacist: '',
            notes: ''
        };
    }

    AddBtn_Click = async () => {
        try {
            const serverUri =
            process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

            const body = {
                name: this.state.name,
                frequency: this.state.frequency,
                timeOfDay: this.state.timeOfDay,
                pharmacist: this.state.pharmacist,
                notes: this.state.notes
            }
            await axios.post(`${serverUri}/Medications/api/Add`, body);

            this.setState({
                name: '',
                frequency: '',
                timeOfDay: '',
                pharmacist: '',
                notes: ''
            });

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <>
                <Label 
                    style={{width: '100%', textAlign: 'center', fontSize: '16px'}}
                >
                    New Medication
                </Label>
                <Table>
                    <TableBody>
                        <Input 
                            className='medicationItem'
                            placeholder='Medication Name'
                            onChange={(event) => this.setState(
                                { name: event.target.value })}
                            value={ this.state.name }
                        />
                        <Select className='medicationItem'
                            placeholder='Frequency'
                            options={frequencyOptions}
                            onChange={(event) => this.setState(
                                { frequency: event.target.innerText })}
                            value={ this.state.frequency }
                        />
                        <Select className='medicationItem'
                            placeholder='Time of Day'
                            options={timeOptions}
                            onChange={(event) => this.setState(
                                { timeOfDay: event.target.innerText })}
                            value={ this.state.timeOfDay }
                        />
                        <Input className='medicationItem'
                            placeholder='Pharmacist'
                            onChange={(event) => this.setState(
                                { pharmacist: event.target.value })}
                            value={ this.state.pharmacist }
                        />
                        <TextArea  className='medicationItem'
                            style={{resize: 'none'}}
                            placeholder='Medication Notes...'
                            onChange={(event) => this.setState(
                                { notes: event.target.value })}
                            value={ this.state.notes }
                        />

                        <tr>
                            <Button
                                    style={{width: '100%', display: 'inline-block'}}
                                    onClick={this.AddBtn_Click}
                                >Add</Button>
                        </tr>
                    </TableBody>
                </Table>
            </>
        );
    }
}

export default NewMedication;