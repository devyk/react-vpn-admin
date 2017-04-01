// Polyfill
import 'babel-polyfill';

// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import IndexPage from './pages/Index';

// Render the router
ReactDOM.render((
  <IndexPage/>
), document.getElementById('app'));

