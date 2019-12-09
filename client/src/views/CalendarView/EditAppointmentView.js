import React from "react";
import EditAppointment from './../../components/Calendar/EditAppointment'

class EditAppointmentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        renderProps: props,
    };
  }

  render() {
    return (
        <>
            <EditAppointment 
              renderProps={this.state.renderProps}
            />
        </>
    );
  }
}
export default EditAppointmentView;
