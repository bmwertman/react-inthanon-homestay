import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Home from './scenes/Home/Home';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();
