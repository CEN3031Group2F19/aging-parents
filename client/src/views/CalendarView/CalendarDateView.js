import React from "react";
import CalendarDate from '../../components/Calendar/CalendarDate';
import { Button } from 'semantic-ui-react';
const axios = require("axios");

class CalendarDateView extends React.Component {
  constructor(props) {
    super(props);

    const dateString = props.dateString.toString();
    var yearParam = new Date().getFullYear();
    var monthParam = new Date().getMonth();
    var dayParam = new Date().getDate();

    if (dateString.length <= 4) {
      yearParam = dateString;
    }
    else if (dateString.length === 6) {
      yearParam = dateString.substr(0, 4);
      monthParam = Number(dateString.substr(4, 2)) - 1;
    }
    else if (dateString.length === 8){
      yearParam = dateString.substr(0, 4);
      monthParam = Number(dateString.substr(4, 2)) - 1;
      dayParam = dateString.substr(6, 2);
    }

    this.state = {
        year: yearParam,
        month: monthParam,
        day: dayParam,
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

  nextDay = () => {
    var nextDate = new Date(this.state.year, this.state.month, this.state.day);
    nextDate.setDate(nextDate.getDate() + 1);

    this.setState({
        year: nextDate.getFullYear(),
        month: nextDate.getMonth(),
        day: nextDate.getDate()
    });
  }

  prevDay = () => {
    var prevDate = new Date(this.state.year, this.state.month, this.state.day);
    prevDate.setDate(prevDate.getDate() - 1);

    this.setState({
        year: prevDate.getFullYear(),
        month: prevDate.getMonth(),
        day: prevDate.getDate()
    });
}

  render() {
    return (
        <>
            <CalendarDate
                year={this.state.year}
                month={this.state.month}
                day={Number(this.state.day)}
                onNext={this.nextDay}
                onPrev={this.prevDay}
                appointments={this.state.appointments}
            />
            <Button 
              href={'/Calendar/Appointment/'+ this.state.year + '/' + (Number(this.state.month) + 1) + '/' + this.state.day}
              style={{width: '100%'}}>New Appointment</Button>
        </>
    );
  }
}
export default CalendarDateView;
