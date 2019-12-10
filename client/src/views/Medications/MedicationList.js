import React from 'react';
import './Medications.css';
import { Button } from 'semantic-ui-react';

class MedicationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    render() {

        return (
            <table style={{width: '100%'}}>
                <tbody>
                    {this.props.medications.map(item => 
                        <a href={'/Medications/Edit/' + item.key.toString()}>
                            <tr
                                style={(this.props.medications.indexOf(item) % 2 == 0) ? 
                                    {backgroundColor: '#e2e2e2', color: '#000', display: 'block', padding: '10px'} 
                                    : {backgroundColor: '#fff', color: '#000', display: 'block', padding: '10px'}}
                            >{item.title}</tr>
                        </a>
                    )}
                </tbody>
                <Button
                    style={{width: '100%'}}
                    href='/Medications/New'
                >New Medication</Button>
            </table>
        );
    }
}

export default MedicationList;