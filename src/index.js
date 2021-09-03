/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Language from './components/Language';
// import Language from './components/Language';
import reportWebVitals from './reportWebVitals';
import Amplify, { I18n } from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

ReactDOM.render(
  <React.StrictMode>
    <Language />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
