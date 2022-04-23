import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import store from './components/redux/store'

ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
    <Provider store={store}>

      <App/>
      
    </Provider>
  </React.StrictMode>
  </BrowserRouter>
,
  document.getElementById('root')
);