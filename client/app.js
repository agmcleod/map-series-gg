import 'core-js/es6/symbol'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { routerMiddleware, syncHistoryWithStore, routerReducer } from 'react-router-redux'
import reduxThunk from 'redux-thunk'
import routes from './routes'

import App from './containers/app'
import seriesReducer from './reducers/series'
import loginReducer from './reducers/login'
import flashReducer from './reducers/flash'
import pouchReducer from './reducers/pouch'

const store = createStore(combineReducers({
  seriesReducer,
  loginReducer,
  flashReducer,
  pouchReducer,
  routing: routerReducer
}), compose(
  applyMiddleware(reduxThunk, routerMiddleware(browserHistory)),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
))

const history = syncHistoryWithStore(browserHistory, store)

const appDiv = document.createElement('div')
appDiv.id = 'app'
document.body.appendChild(appDiv)

ReactDOM.render(
  <Provider store={store}>
    <App routes={routes(history)} />
  </Provider>, appDiv
)
