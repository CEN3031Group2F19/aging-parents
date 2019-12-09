import React from "react";

class CalendarDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    pad = (val, len) => {
        var s = val + '';
        while (s.length < len) s = '0' + s;
        return s;
    }

    render() {
        const totalDays = new Date(this.props.year, this.props.month, 0).getDate();
        var backColor = this.props.selectedDay === this.props.day ? '#afafaf' : '#fff';

        var matchingAppointmnts = this.props.appointments.find( el => {
            var date = new Date(el.startTime);
            if (date.getFullYear() === this.props.year
                && date.getMonth() + 1 === this.props.month
                && date.getDate() === this.props.day) {
                return el;
            }
        });

        var fontColor = matchingAppointmnts === undefined ? '' : 'Green';

        return(
            <td 
                style=
                { {height: '5em', width: '2em', border: 'solid black 2px', backgroundColor: backColor}}>
                <a 
                    href={(this.props.day > totalDays || this.props.day < 1) ? '#' 
                    : ('/Calendar/Date/' + this.pad(this.props.year, 4) + this.pad(this.props.month, 2) + this.pad(this.props.day, 2))}
                    style={{height: '100%', width: '100%', display: 'block', fontSize: '2.5em', lineHeight: '1.75em', color: fontColor}}>
                    {(this.props.day > totalDays 
                        || this.props.day < 1) ? null
                        : <>{this.props.day}</>
                    }
                </a>
            </td>
        )
    }
}

export default CalendarDay;