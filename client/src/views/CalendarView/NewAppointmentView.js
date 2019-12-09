import React from "react";
import NewAppointment from '../../components/Calendar/NewAppointment'

class NewAppointmentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        year: props.year,
        month: props.month,
        day: props.day,
    };
  }

  render() {
    return (
        <>
            <NewAppointment 
              year={this.state.year}
              month={this.state.month}
              day={this.state.day}
            />
        </>
    );
  }
}
export default NewAppointmentView;
