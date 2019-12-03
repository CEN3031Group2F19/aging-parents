import React from 'react';
import './Medications.css';
import { Select, Table, TableHeader, TableBody, TableRow, TableCell, Label, Form, Button, TextArea, Input, Dropdown } from 'semantic-ui-react';

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
            
        };
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
                        <Input className='medicationItem'
                            placeholder='Medication Name'
                        />
                        <Select className='medicationItem'
                            placeholder='Frequency'
                            options={frequencyOptions}
                        />
                        <Select className='medicationItem'
                            placeholder='Time of Day'
                            options={timeOptions}
                        />
                        <Input className='medicationItem'
                            placeholder='Pharmacist'
                        />
                        <TextArea  className='medicationItem'
                            style={{resize: 'none'}}
                            placeholder='Medication Notes...'
                        />

                        <tr>
                            <Button
                                    style={{width: '49%', display: 'inline-block'}}
                                >Save</Button>
                            <Button
                                    style={{width: '49%', display: 'inline-block', float: 'right'}}
                                >Delete</Button>
                        </tr>
                    </TableBody>
                </Table>
            </>
        );
    }
}

export default NewMedication;