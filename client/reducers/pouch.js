const SET_CONNECTED = Symbol('SET_CONNECTED')

const defaultState = {
  connected: false
}

export default function loginReducer (state = defaultState, action) {
  switch (action.type) {
    case SET_CONNECTED:
      console.log(`Set Connected: ${action.connected}`)
      return Object.assign({}, state, { connected: action.connected })
  }

  return state
}

export function setConnected (connected) {
  return (dispatch) => {
    return {
      type: SET_CONNECTED, connected
    }
  }
}
