import React from 'react'
import { PropTypes } from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { register } from '../../reducers/login'
import { connectToRemote } from '../../db'

export class Login extends React.Component {
  constructor (props) {
    super(props)
    this._onSubmit = this._onSubmit.bind(this)

    this.state = {
      username: '',
      password: '',
      mode: 'login'
    }
  }

  componentDidMount () {
    if (this.props.loggedIn) {
      this.props.push('/series')
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.loggedIn) {
      this.props.push('/series')
    }
  }

  _onChange (fieldName, e) {
    this.setState({ [fieldName]: e.target.value })
  }

  _onSubmit (e) {
    e.preventDefault(e)
    const { username, password } = this.state

    if (username !== '' && password !== '') {
      if (this.state.mode === 'register') {
        this.props.register(username, password)
      } else {
        connectToRemote(this.props.dispatch, username, password)
      }
    }
  }

  render () {
    const { mode } = this.state

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this._onSubmit}>
          <div>
            <label htmlFor='username'>Username</label>
            <input type='text' value={this.state.username} name='username' onChange={this._onChange.bind(this, 'username')} />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input type='password' value={this.state.password} name='password' onChange={this._onChange.bind(this, 'password')} />
          </div>
          <div>
            <label htmlFor='login'>Login</label>
            <input type='radio' name='mode' value='login' checked={mode === 'login'} onChange={this._onChange.bind(this, 'mode')} />
            <label htmlFor='register'>Register</label>
            <input type='radio' name='mode' value='register' checked={mode === 'register'} onChange={this._onChange.bind(this, 'mode')} />
          </div>

          <input type='submit' value='Login' />
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  loggedIn: PropTypes.bool,
  register: PropTypes.func.isRequired
}

function mapPropsToDispatch (dispatch) {
  const actions = bindActionCreators({ register, push }, dispatch)

  return { ...actions, dispatch }
}

export default connect((state) => {
  return {
    loggedIn: state.loginReducer.loggedIn
  }
}, mapPropsToDispatch)(Login)
