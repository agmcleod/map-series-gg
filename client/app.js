// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import App from './containers/app';
import db from './db';
import seriesReducer from './reducers/series';

const store = createStore(combineReducers({ seriesReducer }), applyMiddleware(ReduxThunk));

console.log(db);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('content')
);
