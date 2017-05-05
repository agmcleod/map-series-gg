import 'core-js/es6/symbol'
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import reduxThunk from 'redux-thunk';
import routes from './routes';

import App from './containers/app';
import seriesReducer from './reducers/series';

const store = createStore(combineReducers({
  seriesReducer,
  routing: routerReducer
}), applyMiddleware(reduxThunk));

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <App routes={routes(history)} />
  </Provider>, document.getElementById('content')
);
