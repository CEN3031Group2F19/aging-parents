import React from 'react';
import ReactDOM from 'react-dom';
import Notes from './Medications';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Medications />, div);
    ReactDOM.unmountComponentAtNode(div);
});
