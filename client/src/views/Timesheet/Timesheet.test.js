import React from 'react';
import ReactDOM from 'react-dom';
import Timesheet from './Timesheet';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Timesheet />, div);
    ReactDOM.unmountComponentAtNode(div);
});
