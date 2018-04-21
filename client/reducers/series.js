import uuid from 'node-uuid'
import { push } from 'react-router-redux'
import { getDb, indexName } from '../db'
import { error } from './flash'

const defaultState = {
  series: {},
  isFetching: false,
  succeeded: false
}

const LOADING = Symbol('LOADING')
const NEW_SERIES = Symbol('NEW_SERIES')
const LIST_SERIES = Symbol('LIST_SERIES')
const SAVE_SERIES = Symbol('SAVE_SERIES')
const UNSET_SUCCEEDED = Symbol('UNSET_SUCCEEDED')

export default function reducer (state = defaultState, action = {}) {
  const seriesMap = {}
  switch (action.type) {
    case LOADING:
      return Object.assign({}, state, { isFetching: true })
    case SAVE_SERIES:
      state.series = Object.assign({}, state.series, { [action.data._id]: action.data })
      return Object.assign({}, state, { isFetching: false, succeeded: true })
    case NEW_SERIES:
      state.series = Object.assign({}, state.series, { [action.data._id]: action.data })
      return Object.assign({}, state, { isFetching: false })
    case LIST_SERIES:
      action.data.forEach((row) => {
        seriesMap[row.doc._id] = row.doc
      })
      return Object.assign({}, state, { series: seriesMap, isFetching: false })
    case UNSET_SUCCEEDED:
      return Object.assign({}, state, { succeeded: false })
  }
  return state
}

export function listSeries () {
  return (dispatch) => {
    dispatch({ type: LOADING })
    return getDb().query(`${indexName}/by_resource`, { key: 'series', include_docs: true }).then((res) => {
      dispatch({ type: LIST_SERIES, data: res.rows })
    })
  }
}

export function newSeries (data) {
  return (dispatch) => {
    dispatch({ type: LOADING })
    data._id = uuid.v1()
    data.resource = 'series'
    const seriesMaps = data.seriesMaps.map((mapName) => {
      return {
        vetoed: '',
        order: 0,
        name: mapName,
        played: false
      }
    })

    data.seriesMaps = seriesMaps
    return getDb().put(data).then(() => {
      dispatch({ type: NEW_SERIES, data })
      dispatch(push(`/series/${data._id}`))
    }).catch((err) => error(err.message)(dispatch))
  }
}

export function saveSeries (data) {
  return (dispatch) => {
    dispatch({ type: LOADING })
    return getDb().put(data).then((res) => {
      data._rev = res._rev
      dispatch({ type: SAVE_SERIES, data })
    }).catch((err) => error(err.message)(dispatch))
  }
}

export function unsetSucceeded () {
  return (dispatch) => {
    dispatch({ type: UNSET_SUCCEEDED })
  }
}
