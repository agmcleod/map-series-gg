// @flow

export type GameMap = {
  vetoed: string,
  order: number,
  name: string,
  played: boolean
};

export type Series = {
  orderSet: boolean,
  maps: Array<GameMap>
};

export type SeriesState = {
  series: Array<Series>
}

const defaultState: SeriesState = {
  series: []
};

export default function reducer(state: SeriesState = defaultState) { // action
  return state;
}
