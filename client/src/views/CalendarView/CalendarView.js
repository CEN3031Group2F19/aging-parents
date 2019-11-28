import React from "react";
import Calendar from '../../components/Calendar/Calendar'

const appointmentItems = [
  new Date(2019, 10, 11).getTime(),
  new Date(2019, 10, 28).getTime(),
  new Date(2019, 10, 29).getTime(),
  new Date(2019, 10, 27).getTime(),
  new Date(2019, 10, 27).getTime(),
  new Date(2019, 9, 15).getTime(),
  new Date(2019, 11, 25).getTime()
]

class CalendarView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        year: props.year,
        month: props.month,
        day: props.day
    };
  }

  render() {
    return (
        <>
            <Calendar 
                year={this.state.year}
                month={this.state.month}
                day={this.state.day}
                appointments={appointmentItems}
            />
        </>
    );
  }
}
export default CalendarView;
