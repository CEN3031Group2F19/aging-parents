import React from "react";
import { Dropdown, Label, Input, TextArea, Button } from 'semantic-ui-react';
const enums = require('./CalendarEnums');

const obj = (k, v, t) => {
    return {key: k, value: v, text: t};
}

class Appointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: props.year,
            month: props.month,
            day: props.day
        };
      }

    render() {

        return(
            <table style={{ width: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center', tableLayout: 'fixed'}}>
                <tbody>
                <tr>
                    <td colSpan={4}><Label style={{width: '100%', fontSize: '16px'}}>{enums.months[this.state.month]} {this.state.day}, {this.state.year}</Label></td>
                </tr>
                <tr>
                    <td colSpan={4}><Input style={{ width: '100%' }} placeholder="Title"></Input></td>
                </tr>
                <tr>
                    <td colSpan={4}><Input style={{ width: '100%' }} placeholder='Location'></Input></td>
                </tr>
                <tr>
                        <td><Label style={{ width: '100%',  }}>Time</Label></td>
                        <td><Dropdown 
                            scrolling
                            placeholder='Hour'
                            style={{ width: '100%' }}
                            options={enums.hours.map(h =>
                                obj(enums.hours.indexOf(h), h, h)    
                            )}
                        /></td>
                        <td><Dropdown
                            scrolling 
                            placeholder='Minute'
                            style={{ width: '100%' }} 
                            options={enums.minutes.map(m => 
                                obj(enums.minutes.indexOf(m), m, m)
                            )}
                            /></td>
                        <td><Dropdown  
                            scrolling
                            selectedLabel={0}
                            style={{ width: '100%' }} 
                            options={[{ key: 0, text: 'AM', value: 0 },
                                    { key: 1, text: 'PM', value: 1 }]}
                        /></td>
                </tr>
                <tr>
                    <td colSpan={4}><TextArea placeholder='Notes' /></td>
                </tr>
                <tr>
                    <td colSpan={2}><Button style={{ width: '100%' }}>Save</Button></td>
                    <td colSpan={2}><Button style={{ width: '100%' }}>Delete</Button></td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default Appointment;