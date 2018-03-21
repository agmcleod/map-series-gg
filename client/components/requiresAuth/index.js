import React from 'react'
import { PropTypes } from 'prop-types'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { connectToRemote } from '../../db'
import { getCredentials } from '../../storage'

class RequiresAuth extends React.Component {
  componentDidMount () {
    if (!this.props.loggedIn) {
      return this.props.push('/login')
    }
  }

  componentWillReceiveProps (nextProps) {
    const { loggedIn, push, connected } = this.props
    if (!loggedIn || !nextProps.loggedIn) {
      return push('/login')
    }
    if (loggedIn && !connected) {
      const { username, password } = getCredentials()
      connectToRemote(this.props.dispatch, username, password)
    }
  }

  render () {
    const { children, loggedIn } = this.props
    if (loggedIn) {
      return children
    } else {
      return null
    }
  }
}

RequiresAuth.propTypes = {
  loggedIn: PropTypes.bool,
  connected: PropTypes.bool
}

function mapStateToProps (state) {
  return {
    loggedIn: state.loginReducer.loggedIn,
    connected: state.pouchReducer.connected
  }
}

function mapPropsToDispatch (dispatch) {
  const actions = bindActionCreators({ push }, dispatch)

  return { ...actions, dispatch }
}

export default connect(mapStateToProps, mapPropsToDispatch)(RequiresAuth)
