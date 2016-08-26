import React from 'react';
import { connect } from 'react-redux';
import type { Series } from '../../reducers/series';
import { listSeries } from '../../reducers/series';

type Params = {
  id: string
};

type Props = {
  listSeries: () => void,
  isFetching: boolean,
  series: { [id:string]:Series },
  params: Params
}

class ViewSeries extends React.Component {
  props: Props;

  static displayName = 'ViewSeries';

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.props.listSeries();
  }

  render() {
    const series = this.props.series[this.props.params.id];

    if (!series) {
      return <h1>Loading</h1>;
    }

    return (
      <div>
        <h1>{series.name}</h1>
        <ul>
          {series.seriesMaps.map((map, i) => {
            return <li key={i}>{map.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default connect((state) => {
  return { series: state.seriesReducer.series, isFetching: state.seriesReducer.isFetching };
}, { listSeries })(ViewSeries);
