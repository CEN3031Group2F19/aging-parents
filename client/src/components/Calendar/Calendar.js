import React from "react";
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: props.year,
            month: props.month,
            day: props.day,
            appointments: props.appointments
        };
      }

      nextMonth = () => {
        var newDay = 1;
        var newMonth = this.state.month + 1;
        var newYear = this.state.year;

        if (newMonth > 11) {
            newYear++;
            newMonth = 0;
        }

        this.setState({
            year: newYear,
            month: newMonth,
            day: newDay
        });
    }

    prevMonth = () => {
        var newDay = 1;
        var newMonth = this.state.month - 1;
        var newYear = this.state.year;

        if (newMonth < 0) {
            newYear--;
            newMonth = 11;
        }

        this.setState({
            year: newYear,
            month: newMonth,
            day: newDay
        });
    }

    render() {
        return(
            <table style={{ width: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center', tableLayout: 'fixed'}}>
                <tbody>
                <CalendarHeader 
                    year={this.state.year}
                    month={this.state.month}
                    day={this.state.day}
                    onNext={this.nextMonth}
                    onPrev={this.prevMonth}
                />
                <CalendarBody
                    year={this.state.year}
                    month={this.state.month + 1}
                    day={this.state.day}
                    appointments={this.props.appointments}
                />
                </tbody>
            </table>
        );
    }
}

export default Calendar;