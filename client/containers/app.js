import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import appStyles from './app.css'
import Flash from '../components/flash'
import { checkLogin } from '../reducers/login'

export class App extends React.Component {
  componentDidMount () {
    this.props.checkLogin()
  }

  render () {
    return (
      <div className={appStyles.container}>
        <Flash />
        {this.props.routes}
      </div>
    )
  }
}

App.propTypes = {
  routes: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool,
  checkLogin: PropTypes.func
}

export default connect((state, ownProps) => {
  return {
    loggedIn: state.loginReducer.loggedIn,
    currentPath: state.routing.locationBeforeTransitions.pathname
  }
}, { checkLogin })(App)
