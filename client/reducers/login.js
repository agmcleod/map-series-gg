/* global CONFIG */
import { getCredentials, setCredentials } from '../storage'
import { push } from 'react-router-redux'
import { error, success } from './flash'

const SET_LOGGED_IN = Symbol('SET_LOGGED_IN')

const defaultState = {
  loggedIn: false
}

function getHeaders () {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

export default function loginReducer (state = defaultState, action) {
  switch (action.type) {
    case SET_LOGGED_IN:
      return Object.assign({}, state, { loggedIn: action.loggedIn })
  }

  return state
}

export function checkLogin () {
  return (dispatch) => {
    const credentials = getCredentials()
    if (!credentials.username || !credentials.password) {
      dispatch({ type: SET_LOGGED_IN, loggedIn: false })
    } else {
      dispatch({ type: SET_LOGGED_IN, loggedIn: true })
    }
  }
}

export function register (username, password) {
  return (dispatch) => {
    fetch(`${CONFIG.api.url}/register`, { method: 'POST', body: JSON.stringify({ username, password }), headers: getHeaders() })
      .then((res) => res.ok ? res.json() : Promise.reject(res))
      .then(() => {
        setCredentials(username, password)
        dispatch({ type: SET_LOGGED_IN, loggedIn: true })
        success('Registered successfully. Switch the form to login mode and sign in.')(dispatch)
      })
      .catch((err) => {
        error(err.message)(dispatch)
      })
  }
}

export function setLoggedIn (username, password) {
  return (dispatch) => {
    setCredentials(username, password)
    dispatch({ type: SET_LOGGED_IN, loggedIn: true })
    dispatch(push('/'))
  }
}

export function logout () {
  return (dispatch) => {
    setCredentials('', '')
    dispatch({ type: SET_LOGGED_IN, loggedIn: false })
    dispatch(push('/login'))
  }
}
