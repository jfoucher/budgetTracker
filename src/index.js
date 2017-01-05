import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import {Store, DB} from './store'

ReactDOM.render(
  <App store={Store} db={DB} />,
  document.getElementById('root')
);
