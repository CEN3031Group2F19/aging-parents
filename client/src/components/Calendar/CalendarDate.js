import React from "react";
import { Label } from 'semantic-ui-react';
import CalendarHeader from './CalendarHeader';
const enums = require('./CalendarEnums');

class CalendarDateView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
  }

  render() {
      const totalDays = new Date(this.props.year, this.props.month + 1, 0).getDate();

      const renderDate = this.props.year >= 0
                      && this.props.month >= 0
                      && this.props.month <= 11
                      && this.props.day >= 1
                      && this.props.day <= totalDays;

    return (
        <>
        {renderDate ?
            <table style={{ width: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center', tableLayout: 'fixed'}}>
                <CalendarHeader 
                    year={this.props.year}
                    month={this.props.month}
                    day={this.props.day}
                    onNext={this.props.onNext}
                    onPrev={this.props.onPrev}
                    includeWeekdays={false}
                />
                {enums.hours.map(h => 
                    <tr style={(enums.hours.indexOf(h) % 2 == 0) ? 
                        {backgroundColor: '#e2e2e2'}
                    : {}}>
                        <td colspan={1}><Label style={{width: '100%', fontSize: '100%', textAlign:'right'}}>{h} AM</Label></td>
                        <td colSpan={6} ></td>
                    </tr>   
                )}
                {enums.hours.map(h => 
                    <tr style={(enums.hours.indexOf(h) % 2 == 0) ? 
                        {backgroundColor: '#e2e2e2'}
                    : {}}>
                        <td colspan={1}><Label style={{width: '100%', fontSize: '100%', textAlign:'right'}}>{h} PM</Label></td>
                        <td colSpan={6} ></td>
                    </tr>   
                )}
            </table>
            : <h1>Uh oh! This date doesn't exist.</h1>}

        </>
    );
  }
}
export default CalendarDateView;
