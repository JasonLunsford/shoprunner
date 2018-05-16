import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FancyPants from './FancyPants';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<FancyPants />, document.getElementById('root'));
registerServiceWorker();
