import React from 'react'
import { PropTypes } from 'prop-types'
import styles from './index.css'
import { connect } from 'react-redux'
import { clearFlash } from '../../reducers/flash'

class Flash extends React.Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.message !== '') {
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout)
      }

      this.hideTimeout = setTimeout(() => {
        this.props.clearFlash()
      }, 10000)
    }
  }

  render () {
    const { message, type } = this.props
    if (!message) {
      return null
    }

    return (
      <div className={type === 'success' ? styles.success : styles.error}>{message}</div>
    )
  }
}

Flash.propTypes = {
  clearFlash: PropTypes.func.isRequired,
  message: PropTypes.string,
  type: PropTypes.string
}

export default connect((state) => {
  return {
    message: state.flashReducer.message,
    type: state.flashReducer.type
  }
}, { clearFlash })(Flash)
