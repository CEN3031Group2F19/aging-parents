import React from "react";
import CalendarDay from './CalendarDay'

class CalendarWeek extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const dow = new Date(this.props.year, this.props.month - 1, this.props.weekOf).getDay();
        const sunday = (this.props.weekOf - dow);

        return(
            <tr>
                {Array.from(Array(7), (e, i) => { 
                    return <CalendarDay year={this.props.year} month={this.props.month} selectedDay={this.props.day} day={sunday + i} />
                })}
            </tr>
        );
    }
}

export default CalendarWeek;