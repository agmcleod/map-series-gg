// @flow

import uuid from 'node-uuid';
import type { Action, Dispatch } from 'redux';
import db, { index_name } from '../db';

export type GameMap = {
  vetoed: string,
  order: number,
  name: string,
  played: boolean
};

export type Series = {
  _id: string,
  _rev: string,
  name: string,
  resource: string,
  orderSet: boolean,
  seriesMaps: Array<GameMap>,
  bestOf: ?number
};

export type SeriesState = {
  series: { [id:string]: Series },
  isFetching: boolean,
  succeeded: boolean
}

const defaultState: SeriesState = {
  series: {},
  isFetching: false,
  succeeded: false
};

const LOADING = 'LOADING';
const NEW_SERIES = 'NEW_SERIES';
const LIST_SERIES = 'LIST_SERIES';
const SAVE_SERIES = 'SAVE_SERIES';
const UNSET_SUCCEEDED = 'UNSET_SUCCEEDED';

export default function reducer(state: SeriesState = defaultState, action: Action) {
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
      for (let i = 0; i < action.data.length; i++) {
        const row = action.data[i].doc;
        seriesMap[row._id] = row;
      }
      return Object.assign({}, state, { series: seriesMap, isFetching: false });
    case UNSET_SUCCEEDED:
      return Object.assign({}, state, { succeeded: false });
  }
  return state;
}

export function listSeries() {
  return (dispatch: Dispatch) => {
    dispatch({ type: LOADING });
    return db.query(`${index_name}/by_resource`, { key: 'series', include_docs: true }).then((res) => {
      dispatch({ type: LIST_SERIES, data: res.rows });
    });
  };
}

export function newSeries(data: Object) {
  return (dispatch: Dispatch) => {
    dispatch({ type: LOADING });
    data._id = uuid.v1();
    data.resource = 'series';
    const seriesMaps = data.seriesMaps.map((mapName): GameMap => {
      return {
        vetoed: '',
        order: 0,
        name: mapName,
        played: false
      };
    });

    data.seriesMaps = seriesMaps;
    return db.put(data).then(() => {
      dispatch({ type: NEW_SERIES, data });
    }).catch((err) => console.error(err));
  };
}

export function saveSeries(data: Series) {
  return (dispatch: Dispatch) => {
    dispatch({ type: LOADING });
    return db.put(data).then((res) => {
      data._rev = res._rev;
      dispatch({ type: SAVE_SERIES, data });
    }).catch((err) => console.error(err));
  };
}

export function unsetSucceeded() {
  return (dispatch: Dispatch) => {
    dispatch({ type: UNSET_SUCCEEDED });
  };
}
