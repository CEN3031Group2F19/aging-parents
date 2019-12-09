import React from "react";
import { Button, Label } from "semantic-ui-react";
const enums = require('./CalendarEnums');

class CalendarHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }

    render() {
        const includeWeekdays = this.props.includeWeekdays === undefined ? true : this.props.includeWeekdays;
        return (
            <>
                <tr>
                    <td>
                        <Button 
                            onClick={this.props.onPrev}
                            style={{position: 'relative', margin: '0 auto' }}>
                            Back
                        </Button>
                    </td>
                    <td 
                        colSpan={5}>
                        <Label style={{width: '100%', fontSize: '16px'}}>
                            {enums.months[this.props.month]} {this.props.day}, {this.props.year}
                        </Label></td>
                    <td>
                        <Button
                            onClick={this.props.onNext}
                            style={{position: 'relative', margin: '0 auto'}}>
                            Next
                        </Button>
                    </td>
                </tr>
                <tr>
                    {includeWeekdays ? enums.daysOfWeek.map(day => 
                        <td>{day}</td>
                    ) : null}
                </tr>
                </>
        );
    }
}


export default CalendarHeader;