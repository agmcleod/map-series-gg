import uuid from 'node-uuid';
import db, { index_name } from '../db';

const defaultState = {
  series: {},
  isFetching: false,
  succeeded: false
};

const LOADING = 'LOADING';
const NEW_SERIES = 'NEW_SERIES';
const LIST_SERIES = 'LIST_SERIES';
const SAVE_SERIES = 'SAVE_SERIES';
const UNSET_SUCCEEDED = 'UNSET_SUCCEEDED';

export default function reducer(state = defaultState, action = {}) {
  const seriesMap = {};
  switch (action.type) {
    case LOADING:
      return Object.assign({}, state, { isFetching: true });
    case SAVE_SERIES:
      state.series = Object.assign({}, state.series, { [action.data._id]: action.data });
      return Object.assign({}, state, { isFetching: false, succeeded: true });
    case NEW_SERIES:
      state.series = Object.assign({}, state.series, { [action.data._id]: action.data });
      return Object.assign({}, state, { isFetching: false });
    case LIST_SERIES:
      const data = action.data as Doc[];
      for (let i = 0; i < data.length; i++) {
        const row = data[i].doc;
        seriesMap[row._id] = row;
      }
      return Object.assign({}, state, { series: seriesMap, isFetching: false });
    case UNSET_SUCCEEDED:
      return Object.assign({}, state, { succeeded: false });
  }
  return state;
}

export function listSeries() {
  return (dispatch) => {
    dispatch({ type: LOADING });
    return db.query(`${index_name}/by_resource`, { key: 'series', include_docs: true }).then((res) => {
      dispatch({ type: LIST_SERIES, data: res.rows });
    });
  };
}

export function newSeries(data) {
  return (dispatch) => {
    dispatch({ type: LOADING });
    data._id = uuid.v1();
    data.resource = 'series';
    const seriesMaps = data.seriesMaps.map((mapName) => {
      return {
        vetoed: '',
        order: 0,
        name: mapName,
        played: false
      }
    });

    data.seriesMaps = seriesMaps;
    return db.put(data).then(() => {
      dispatch({ type: NEW_SERIES, data });
    }).catch((err) => console.error(err));
  };
}

export function saveSeries(data) {
  return (dispatch) => {
    dispatch({ type: LOADING });
    return db.put(data).then((res) => {
      data._rev = res._rev;
      dispatch({ type: SAVE_SERIES, data });
    }).catch((err) => console.error(err));
  };
}

export function unsetSucceeded() {
  return (dispatch) => {
    dispatch({ type: UNSET_SUCCEEDED });
  };
}
