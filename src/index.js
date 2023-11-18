import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import PomodoroTimer from './PomodoroTimer';
import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<PomodoroTimer />, document.getElementById('root'));
registerServiceWorker();
