import React from "react";
import Calendar from '../../components/Calendar/Calendar'
const axios = require("axios");

class CalendarView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        year: props.year,
        month: props.month,
        day: props.day,
        appointments: []
    };

    this.populateAppointments();
  }
  
  appointmentParse = (obj) => {
    try {
      return {
        key: obj.key,
        title: obj.title,
        notes: obj.notes,
        reminderMinutes: obj.reminderMinutes,
        location: obj.location,
        userEmail: obj.userEmail,
        startTime: obj.startTime,
        endTime: obj.endTime
      };
    }
    catch(error) {
      console.log(error);
      return {};
    }
  }

  populateAppointments = async () => {
    const serverUri =
        process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";
    
    try {
        const response = await axios.get(`${serverUri}/Calendar/api/Appointments`);

        var dbAppointments = [];

        response.data.forEach(el => {
          dbAppointments.splice(0, 0, this.appointmentParse(el));
        });

        this.setState({ appointments: [...dbAppointments] });
    } catch (error) {
      console.log(error);
    }
};

  render() {
    return (
        <>
            <Calendar 
                year={this.state.year}
                month={this.state.month}
                day={this.state.day}
                appointments={this.state.appointments}
            />
        </>
    );
  }
}
export default CalendarView;
