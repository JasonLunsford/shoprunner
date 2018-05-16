import React from 'react';
import ReactDOM from 'react-dom';
import SweetSoul from './SweetSoul';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SweetSoul />, div);
  ReactDOM.unmountComponentAtNode(div);
});
