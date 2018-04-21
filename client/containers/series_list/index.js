import _ from 'lodash'
import React from 'react'
import { PropTypes } from 'prop-types'
import styles from './styles.css'
import NewSeries from '../../components/new_series'

import { listSeries } from '../../reducers/series'
import { logout } from '../../reducers/login'
import { connect } from 'react-redux'

import { Link } from 'react-router'

class SeriesList extends React.Component {
  constructor (props) {
    super(props)

    this.logout = this.logout.bind(this)
  }

  componentDidMount () {
    this.props.listSeries()
  }

  logout () {
    this.props.logout()
  }

  render () {
    return (
      <div>
        <h1>Series</h1>
        <button type='button' onClick={this.logout}>Logout</button>
        <div className={styles.content}>
          <div className={styles.newPanel}>
            <NewSeries />
          </div>
          <div className={styles.listPanel}>
            <h2>View Existing Series</h2>
            <ul>
              {_.map(this.props.series, (series, _id) => {
                return <li key={`series_${_id}`}><Link to={`/series/${series._id}`}>{series.name}</Link></li>
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

SeriesList.defaultProps = {
  series: {},
  isFetching: false
}

SeriesList.propTypes = {
  listSeries: PropTypes.func.isRequired,
  series: PropTypes.object.isRequired,
  isFetching: PropTypes.bool
}

export default connect((state) => {
  return { series: state.seriesReducer.series, isFetching: state.seriesReducer.isFetching }
}, { listSeries, logout })(SeriesList)
