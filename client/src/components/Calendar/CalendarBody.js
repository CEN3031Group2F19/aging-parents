import React from "react";
import CalendarWeek from'./CalendarWeek';

class CalendarBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }

    render() {

        return(
            <>
                {Array.from(Array(6), (e, i) => { 
                    return <CalendarWeek year={this.props.year} month={this.props.month} day={this.props.day} weekOf={(i * 7) + 1} appointments={this.props.appointments} />
                })}
            </>
        );
    }
}

export default CalendarBody;