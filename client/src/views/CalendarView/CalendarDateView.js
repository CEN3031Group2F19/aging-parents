import React from "react";
import CalendarDate from '../../components/Calendar/CalendarDate';
import { Button } from 'semantic-ui-react';

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
        day: dayParam
    };
  }

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
            />
            <Button 
              href={'/Calendar/Appointment/'+ this.state.year + '/' + (Number(this.state.month) + 1) + '/' + this.state.day}
              style={{width: '100%'}}>New Appointment</Button>
        </>
    );
  }
}
export default CalendarDateView;
