// src/app-client.js
import React from 'react';
import ReactDOM from 'react-dom';
import NotFound from './components/NotFound';

window.onload = () => {
  ReactDOM.render(<NotFound/>, document.getElementById('main'));
};