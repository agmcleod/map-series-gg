import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(combineReducers({}), applyMiddleware(ReduxThunk));