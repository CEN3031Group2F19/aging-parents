import React from 'react';
import ReactDOM from 'react-dom';
import DailyTasks from './DailyTasks';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DailyTasks />, div);
    ReactDOM.unmountComponentAtNode(div);
});
