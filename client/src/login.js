import {Component} from 'react';
import {render} from 'react-dom';
import Login from './components/Login';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index.js';
import {Provider} from 'react-redux';
import createLogger from 'redux-logger';

import './style/logint.less';

const store = createStore(
  rootReducer,
  applyMiddleware(createLogger(), thunkMiddleware)
);


render(
  <Provider store={store}>
    <Login/>
  </Provider>,
  document.getElementById('login'));
