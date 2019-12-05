import React from 'react';
import './Medications.css';
import MedicationList from './MedicationList';
import { Label, Form, Button, TextArea, Input, Dropdown } from 'semantic-ui-react';

const medications = [
    {key: 1, title: 'Medication 1'},
    {key: 2, title: 'Medication 2'},
    {key: 3, title: 'Medication 3'},
    {key: 4, title: 'Medication 4'},
    {key: 5, title: 'Medication 5'},
];

class Medications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    render() {
        return (
            <>
                <Label style={{width: '100%', textAlign:'center', fontSize: '16px'}}>Medications</Label>
                <MedicationList medications={medications}/>
            </>
        );
    }
}

export default Medications;