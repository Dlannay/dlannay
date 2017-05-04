import React from 'react';
import ReactDOM from 'react-dom';
import css from './app.scss';

global.jQuery = require('jquery');
require('bootstrap');

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);

console.log('Testing hot module replacement')