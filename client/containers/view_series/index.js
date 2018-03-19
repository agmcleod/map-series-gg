import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { listSeries, saveSeries, unsetSucceeded } from '../../reducers/series'
import styles from './index.css'
import classNames from 'classnames'
import { Link } from 'react-router'
import formStyle from '../../globalstyles/form.css'

class ViewSeries extends React.Component {
  static propTypes = {
    listSeries: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    series: PropTypes.object,
    saveSeries: PropTypes.func.isRequired,
    succeeded: PropTypes.bool,
    unsetSucceeded: PropTypes.func.isRequired,
    params: PropTypes.shape({ id: PropTypes.string })
  }

  static displayName = 'ViewSeries'

  constructor (props) {
    super(props)

    this._onFieldChange = this._onFieldChange.bind(this)
    this._onSave = this._onSave.bind(this)

    this.state = this.getStateFromProps(this.props)
  }

  componentDidMount () {
    this.props.listSeries()
  }

  componentWillReceiveProps (nextProps) {
    this.setState(this.getStateFromProps(nextProps))
  }

  componentWillUnmount () {
    if (this.props.succeeded) {
      this.props.unsetSucceeded()
    }
  }

  getStateFromProps (props) {
    const series = props.series[props.params.id]

    let bestOf = 1
    let seriesMaps = []
    if (series) {
      seriesMaps = series.seriesMaps
      if (series.bestOf) {
        bestOf = series.bestOf
      }
    }

    return { seriesMaps, bestOf }
  }

  _onBestOfChange (e) {
    this.setState({ bestOf: parseFloat(e.target.value) })
  }

  _onFieldChange (e, i, fieldName) {
    const seriesMaps = this.state.seriesMaps
    seriesMaps[i][fieldName] = e.target.value
    this.setState({ seriesMaps })
  }

  _onSave () {
    const series = this.props.series[this.props.params.id]

    series.seriesMaps = this.state.seriesMaps
    series.bestOf = this.state.bestOf

    this.props.saveSeries(series)
  }

  _renderBestOf () {
    const bestOf = []
    const numOfMaps = this.state.seriesMaps.length
    if (numOfMaps > 0) {
      bestOf.push(1)
    }

    if (numOfMaps >= 3) {
      bestOf.push(3)
    }

    if (numOfMaps >= 5) {
      bestOf.push(5)
    }

    if (numOfMaps >= 7) {
      bestOf.push(7)
    }

    if (bestOf.length > 0) {
      return (
        <select onChange={(e) => this._onBestOfChange(e)} defaultValue={this.state.bestOf}>
          {bestOf.map((count, i) => {
            return (
              <option key={i} value={count}>
                Best of {count}
              </option>
            )
          })}
        </select>
      )
    }

    return null
  }

  _renderItemInput (i, vetoed) {
    return (
      <input
        className={formStyle.textField}
        type='text'
        placeholder='Who Vetod?'
        onChange={(e) => this._onFieldChange(e, i, 'vetoed')}
        value={vetoed} />
    )
  }

  _renderSuccededNotice () {
    return (
      <div className={styles.succeded}>
        <p>Series saved successfully</p>
        <button type='button' className={styles.close} onClick={this.props.unsetSucceeded}>Close</button>
      </div>
    )
  }

  render () {
    const series = this.props.series[this.props.params.id]

    if (!series) {
      return <h1>Loading</h1>
    }

    let vetoedCount = 0
    for (let i = 0; i < this.state.seriesMaps.length; i++) {
      if (this.state.seriesMaps[i].vetoed) {
        vetoedCount++
      }
    }

    const finished = this.state.seriesMaps.length - vetoedCount === this.state.bestOf

    return (
      <div>
        {this.props.succeeded ? this._renderSuccededNotice() : null}
        <h1>{series.name}</h1>
        <p><Link to='/'>Back</Link></p>
        {this._renderBestOf()}
        <ul className={styles.list}>
          {this.state.seriesMaps.map((map, i) => {
            const chosen = !map.vetoed && finished
            const classes = classNames(styles.listItemBase, {
              [styles.grayedOut]: Boolean(map.vetoed),
              [styles.chosen]: chosen
            })
            return (
              <li key={i} className={classes}>
                {map.name}
                {chosen ? null : this._renderItemInput(i, map.vetoed)}
              </li>
            )
          })}
        </ul>

        <button type='button' onClick={this._onSave}>Save</button>
      </div>
    )
  }
}

export default connect((state) => {
  return {
    series: state.seriesReducer.series,
    isFetching: state.seriesReducer.isFetching,
    succeeded: state.seriesReducer.succeeded
  }
}, { listSeries, saveSeries, unsetSucceeded })(ViewSeries)
