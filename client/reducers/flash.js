const SET_MESSAGE = Symbol('SET_ERROR_MESSAGE')
const CLEAR_FLASH = Symbol('CLEAR_FLASH')

const defaultState = {
  message: '',
  type: ''
}

export default function flashReducer (state = defaultState, action) {
  switch (action.type) {
    case SET_MESSAGE:
      return Object.assign({}, state, {
        type: action.flashType,
        message: action.message
      })
    case CLEAR_FLASH:
      return Object.assign({}, state, {
        type: '',
        message: ''
      })
  }

  return state
}

export function success (message) {
  return (dispatch) => {
    dispatch({ type: SET_MESSAGE, message, flashType: 'success' })
  }
}

export function error (message) {
  return (dispatch) => {
    dispatch({ type: SET_MESSAGE, message, flashType: 'error' })
  }
}

export function clearFlash () {
  return (dispatch) => {
    dispatch({ type: CLEAR_FLASH })
  }
}
