import React from 'react';
import { Redirect } from 'react-router-dom';
import './Medications.css';
import { Confirm, Select, Table, TableBody, Label, Button, TextArea, Input } from 'semantic-ui-react';
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
];

class EditMedication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: -1,
            name: '',
            frequency: '',
            timeOfDay: '',
            pharmacist: '',
            notes: '',
            open: false
        };

        this.getMedication(props.medicationId);
    }

    getMedication = async (id) => {

        const serverUri =
            process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";
        
        try {
            const response = await axios.get(
                `${serverUri}/Medications/api/Medications/${id}`);

            if (response.data !== "") {
                const med = response.data;

                this.setState({
                    key: med.key,
                    name: med.name,
                    frequency: med.frequency,
                    timeOfDay: med.timeOfDay,
                    pharmacist: med.pharmacist,
                    notes: med.notes
                });
            }
            else 
                throw new Error('Medication not found.');
            
        } catch (error) {
          console.log(error);
          this.setState({
              key: null
          });
        }
    }

    postRequest = async (path, body) => {
        try {
            const serverUri =
            process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

            await axios.post(`${serverUri}${path}`, body);
        } catch (error) {
            console.log(error);
        }
    }

    SaveBtn_Click = () => {
        this.postRequest('/Medications/api/Update',
        {
            key: this.state.key,
            name: this.state.name,
            frequency: this.state.frequency,
            timeOfDay: this.state.timeOfDay,
            pharmacist: this.state.pharmacist,
            notes: this.state.notes
        });
    }

    DeleteBtn_Click = () => {
        this.postRequest('/Medications/api/Delete',
        { key: this.state.key });
        this.getMedication();
        this.setState({open: false});
    }

    render() {
        return (
            (this.state.key !== null) ? 
            <>
            <Label 
                style={{width: '100%', textAlign: 'center', fontSize: '16px'}}
            >
                Edit Medication
            </Label>
            <Table>
                <TableBody>
                    <Input className='medicationItem'
                        placeholder='Medication Name'
                        onChange={(event) => this.setState(
                            { name: event.target.value })}
                        value={this.state.name}
                    />
                    <Select className='medicationItem'
                        placeholder='Frequency'
                        options={frequencyOptions}
                        onChange={(event) => this.setState(
                            { frequency: event.target.innerText })}
                        value={this.state.frequency}
                    />
                    <Select className='medicationItem'
                        placeholder='Time of Day'
                        options={timeOptions}
                        onChange={(event) => this.setState(
                            { timeOfDay: event.target.innerText })}
                        value={this.state.timeOfDay}
                    />
                    <Input className='medicationItem'
                        placeholder='Pharmacist'
                        onChange={(event) => this.setState(
                            { pharmacist: event.target.value })}
                        value={this.state.pharmacist}
                    />
                    <TextArea  className='medicationItem'
                        style={{resize: 'none'}}
                        placeholder='Medication Notes...'
                        onChange={(event) => this.setState(
                            { notes: event.target.value })}
                        value={this.state.notes}
                    />
                    <tr>
                        <Button
                                style={{width: '49%', display: 'inline-block'}}
                                onClick={this.SaveBtn_Click}
                            >Save</Button>
                        <Button
                                style={{width: '49%', display: 'inline-block', float: 'right'}}
                                onClick={() => this.setState({open: true})}
                            >Delete</Button>
                    </tr>
                </TableBody>
            </Table>
            <Confirm 
                open={this.state.open}
                onCancel={() => {this.setState({open: false})}}
                onConfirm={() => this.DeleteBtn_Click()}
            />
            </> 
            : 
            <Redirect to="/Medications" />
        );
    }
}

export default EditMedication;