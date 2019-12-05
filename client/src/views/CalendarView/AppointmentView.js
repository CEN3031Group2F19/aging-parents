import React from "react";
import Appointment from './../../components/Calendar/Appointment'

class AppointmentView extends React.Component {
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
            <Appointment 
                year={this.state.year}
                month={this.state.month}
                day={this.state.day}
            />
        </>
    );
  }
}
export default AppointmentView;
