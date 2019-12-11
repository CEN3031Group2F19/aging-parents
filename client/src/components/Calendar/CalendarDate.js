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
                <tbody>
                <CalendarHeader 
                    year={this.props.year}
                    month={this.props.month}
                    day={this.props.day}
                    onNext={this.props.onNext}
                    onPrev={this.props.onPrev}
                    includeWeekdays={false}
                />
                {this.props.appointments.map(appt =>{
                    var date = new Date(appt.startTime);
                    var startTime = new Date(appt.startTime)
                        .toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                    var endTime = new Date(appt.endTime)
                        .toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

                    if (date.getFullYear() === Number(this.props.year)
                        && date.getMonth() === Number(this.props.month)
                        && date.getDate() === Number(this.props.day)) {
                        return <tr style={{backgroundColor: '#ee8422', color: '#fff'}}>
                            <td colSpan={3}><a href={`/Calendar/Appointment/Edit/${appt.key}`}><Label style={{width: '100%', fontSize: '100%', textAlign:'center', backgroundColor: '#ee8422', color: '#fff'}}>{appt.title}</Label></a></td>
                            <td colSpan={2}>{startTime}</td>
                            <td colSpan={2}>{endTime}</td>
                        </tr>
                    }
                })}
                </tbody>
            </table>
            : <h1>Uh oh! This date doesn't exist.</h1>}

        </>
    );
  }
}
export default CalendarDateView;
