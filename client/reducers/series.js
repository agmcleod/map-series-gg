// @flow

import uuid from 'node-uuid';
import type { Action, Dispatch } from 'redux';
import db from '../db';

export type GameMap = {
  vetoed: string,
  order: number,
  name: string,
  played: boolean
};

export type Series = {
  id: string,
  name: string,
  orderSet: boolean,
  maps: Array<GameMap>
};

export type SeriesState = {
  series: { [id:string]: Series },
  isFetching: boolean
}

const defaultState: SeriesState = {
  series: {},
  isFetching: false
};

const LOADING = 'LOADING';
const NEW_SERIES = 'NEW_SERIES';
const LIST_SERIES = 'LIST_SERIES';

export default function reducer(state: SeriesState = defaultState, action: Action) {
  switch (action.type) {
    case LOADING:
      return Object.assign({}, state, { isFetching: true });
    case NEW_SERIES:
      state.series = Object.assign({}, state.series, { [action.data.id]: action.data });
      return Object.assign({}, state, { isFetching: false });
    case LIST_SERIES:
      return state;
  }
  return state;
}

export function newSeries(data: Series) {
  return (dispatch: Dispatch) => {
    dispatch({ type: LOADING });
    data.id = uuid.v1();
    db.put(data).then(() => {
      dispatch({ type: NEW_SERIES, data });
    }).catch((err) => console.log(err));
  };
}
