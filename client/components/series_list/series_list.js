import _ from 'lodash'
import React from 'react'
import { PropTypes } from 'prop-types'
import styles from './styles.css'
import NewSeries from '../new_series/new_series'

import { listSeries } from '../../reducers/series'
import { connect } from 'react-redux'

import { Link } from 'react-router'

class SeriesList extends React.Component {
  static displayName = 'SeriesList'
  static defaultProps = {
    series: {},
    isFetching: false
  }

  static propTypes = {
    listSeries: React.PropTypes.func.isRequired,
    series: React.PropTypes.object.isRequired,
    isFetching: React.PropTypes.bool,
  }

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.listSeries()
  }

  render () {
    return (
      <div>
        <h1>Series</h1>
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

export default connect((state) => {
  return { series: state.seriesReducer.series, isFetching: state.seriesReducer.isFetching }
}, { listSeries })(SeriesList)
