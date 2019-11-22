import React from "react";
import Calendar from '../../components/Calendar/Calendar'

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
            />
        </>
    );
  }
}
export default CalendarView;
