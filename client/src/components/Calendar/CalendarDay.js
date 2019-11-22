import React from "react";

class CalendarDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const totalDays = new Date(this.props.year, this.props.month, 0).getDate();
        
        return(
            <td 
                style=
                {
                    this.props.selectedDay === this.props.day ?
                    {height: '5em', width: '2em', border: 'solid black 2px', backgroundColor: '#afafaf'}
                    : {height: '5em', width: '2em', border: 'solid black 2px'}
                }>
                <a 
                    href={(this.props.day > totalDays || this.props.day < 1) ? '#' 
                    : ('/Calendar/Date/' + this.props.year + '/' + this.props.month + '/' + this.props.day)}
                    style={{height: '100%', width: '100%', display: 'block', fontSize: '2.5em', lineHeight: '1.75em'}}>
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