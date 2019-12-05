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

const testMedications = [
    {key: 1, name: 'Medication 1', frequency: 'Mondays', timeOfDay: '', pharmacist: "Joe's Pharmacy", notes: 'Take once a day'},
    {key: 2, name: 'Medication 2', frequency: 'Daily', timeOfDay: 'Morning', pharmacist: "CVS", notes: ''},
    {key: 3, name: 'Medication 3', frequency: 'Saturdays', timeOfDay: 'Evening', pharmacist: "Publix", notes: 'Take on an empty stomach'},
    {key: 4, name: 'Medication 4', frequency: '', timeOfDay: 'Morning', pharmacist: "Walgreens", notes: 'Take with water'},
    {key: 5, name: 'Medication 5', frequency: 'Weekly', timeOfDay: 'Afternoon', pharmacist: "", notes: 'Take during a meal'}
];

class EditMedication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    getMedication = (medicationId) => {
        for (var i = 0; i < testMedications.length; i++) 
            if (testMedications[i].key == medicationId)
                return testMedications[i];
        
        return null;
    }

    render() {

        const medication = this.getMedication(this.props.medicationId);

        return (
            (medication !== null) ? 
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
                        value={medication.name}
                    />
                    <Select className='medicationItem'
                        placeholder='Frequency'
                        options={frequencyOptions}
                        value={medication.frequency}
                    />
                    <Select className='medicationItem'
                        placeholder='Time of Day'
                        options={timeOptions}
                        value={medication.timeOfDay}
                    />
                    <Input className='medicationItem'
                        placeholder='Pharmacist'
                        value={medication.pharmacist}
                    />
                    <TextArea  className='medicationItem'
                        style={{resize: 'none'}}
                        placeholder='Medication Notes...'
                        value={medication.notes}
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
            </Table></> : <></>
        );
    }
}

export default EditMedication;