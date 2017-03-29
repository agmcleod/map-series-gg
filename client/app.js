import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk'

import { App } from './containers/app';
import seriesReducer from './reducers/series';

const store = createStore(combineReducers({ seriesReducer }), applyMiddleware(reduxThunk));

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('content')
);
