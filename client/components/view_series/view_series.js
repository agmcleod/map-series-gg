import React from 'react';
import { connect } from 'react-redux';
import type { Series } from '../../reducers/series';
import { listSeries } from '../../reducers/series';
import styles from './view_series_styles.css';
import classNames from 'classnames';
import { Link } from 'react-router';
import formStyle from '../../globalstyles/form.css';

type Params = {
  id: string
};

type Props = {
  listSeries: () => void,
  isFetching: boolean,
  series: { [id:string]:Series },
  params: Params
}

type State = {
  seriesMaps: Array<Series>
};

class ViewSeries extends React.Component {
  props: Props;
  state: State;

  static displayName = 'ViewSeries';

  constructor(props: Props) {
    super(props);

    this._onFieldChange = this._onFieldChange.bind(this);

    let seriesMaps = [];
    const series = this.props.series[this.props.params.id];

    let bestOf = 1;
    if (series) {
      seriesMaps = series.seriesMaps;
      if (series.bestOf) {
        bestOf = series.bestOf;
      }
    }
    this.state = { seriesMaps, bestOf };
  }

  componentDidMount() {
    this.props.listSeries();
  }

  componentWillReceiveProps(nextProps) {
    const series = nextProps.series[nextProps.params.id];

    if (series) {
      this.setState({ seriesMaps: series.seriesMaps });
    }
  }

  _onBestOfChange(e) {
    this.setState({ bestOf: parseFloat(e.target.value) });
  }

  _onFieldChange(e, i, fieldName) {
    const seriesMaps = this.state.seriesMaps;
    seriesMaps[i][fieldName] = e.target.value;
    this.setState({ seriesMaps });
  }

  _renderBestOf() {
    const bestOf = [];
    const numOfMaps = this.state.seriesMaps.length;
    if (numOfMaps > 0) {
      bestOf.push(1);
    }

    if (numOfMaps >= 3) {
      bestOf.push(3);
    }

    if (numOfMaps >= 5) {
      bestOf.push(5);
    }

    if (numOfMaps >= 7) {
      bestOf.push(7);
    }

    if (bestOf.length > 0) {
      return (
        <select onChange={(e) => this._onBestOfChange(e)}>
          {bestOf.map((count, i) => {
            return <option key={i} value={count}>Best of {count}</option>;
          })}
        </select>
      );
    }

    return null;
  }

  render() {
    const series = this.props.series[this.props.params.id];

    if (!series) {
      return <h1>Loading</h1>;
    }

    let vetoedCount = 0;
    for (let i = 0; i < this.state.seriesMaps.length; i++) {
      if (this.state.seriesMaps[i].vetoed) {
        vetoedCount++;
      }
    }

    const finished = this.state.seriesMaps.length - vetoedCount === this.state.bestOf;

    return (
      <div>
        <h1>{series.name}</h1>
        <p><Link to='/'>Back</Link></p>
        {this._renderBestOf()}
        <ul className={styles.list}>
          {this.state.seriesMaps.map((map, i) => {
            const chosen = !map.vetoed && finished;
            const classes = classNames(styles.listItemBase, {
              [styles.grayedOut]: Boolean(map.vetoed),
              [styles.chosen]: chosen
            });
            return (
              <li key={i} className={classes}>
                {map.name}
                <input
                  className={classNames(formStyle.textField, { [styles.disabled]: chosen })}
                  type='text'
                  placeholder='Who Vetod?'
                  onChange={(e) => this._onFieldChange(e, i, 'vetoed')}
                  disabled={chosen} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connect((state) => {
  return { series: state.seriesReducer.series, isFetching: state.seriesReducer.isFetching };
}, { listSeries })(ViewSeries);
