import React from 'react';
import './Medications.css';
import { Table, TableBody, TableRow, Form, Button, TextArea, Input, Dropdown } from 'semantic-ui-react';

class MedicationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    render() {
        return (
            <Table>
                <TableBody>
                    {this.props.medications.map(item => 
                        <a href={'/Medications/Edit/' + item.key.toString()}>
                            <TableRow
                                style={(this.props.medications.indexOf(item) % 2 == 0) ? 
                                    {backgroundColor: '#e2e2e2', color: '#000'} 
                                    : {backgroundColor: '#fff', color: '#000'}}
                            >{item.title}</TableRow>
                        </a>
                    )}
                </TableBody>
                <Button
                    style={{width: '100%'}}
                    href='/Medications/New'
                >New Medication</Button>
            </Table>
        );
    }
}

export default MedicationList;