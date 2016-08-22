// @flow

import _ from 'lodash';
import React from 'react';
import styles from './styles.css';
import NewSeries from '../new_series/new_series';
import type { Series } from '../../reducers/series';

type Props = {
  series: { [id:string]:Series }
}

export default class SeriesList extends React.Component {
  static displayName = 'SeriesList';
  static defaultProps = {
    series: {}
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
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
              {_.map(this.props.series, (id: number, series: Series) => {
                return <li key={`series_${id}`}>{series.name}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
