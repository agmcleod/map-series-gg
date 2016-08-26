// @flow

import React from 'react';
import styles from './new_series_styles.css';
import formStyles from '../../globalstyles/form.css';

import { connect } from 'react-redux';
import { newSeries } from '../../reducers/series';

type Props = {
  newSeries: (data: Object) => void
};

class NewSeries extends React.Component {

  props: Props;

  state: {
    name: string;
    seriesMaps: string;
  }

  static displayName = 'NewSeries';

  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      seriesMaps: ''
    };

    // some gross flow workaround needed for rebinding method
    (this:any)._createSeries = this._createSeries.bind(this);
  }

  _createSeries(e) {
    e.preventDefault();

    const { name, seriesMaps } = this.state;

    if (name && seriesMaps) {
      const data = {
        name,
        seriesMaps: seriesMaps.split(/\r\n|\n/)
      };

      this.props.newSeries(data);
      this.setState({ name: '', seriesMaps: '' });
    }
  }

  _onFieldChange(e, propName: string) {
    const nState = {};
    nState[propName] = e.target.value;
    this.setState(nState);
  }

  render() {
    return (
      <div>
        <h2>New Series</h2>
        <form onSubmit={this._createSeries}>
          <fieldset className={styles.fieldset}>
            <div className={formStyles.fieldGroup}>
              <label htmlFor='name'>Name of the series:</label>
              <input
                type='text'
                id='name'
                className={formStyles.textField}
                onChange={(e) => this._onFieldChange(e, 'name')}
              />
            </div>
            <div className={formStyles.fieldGroup}>
              <label htmlFor='series-maps'>Paste or type map list below. Each one line by line.</label>
              <textarea
                className={styles.textarea}
                id='series-maps' onChange={(e) => this._onFieldChange(e, 'seriesMaps')}
              />
            </div>
            <input type='submit' className={formStyles.submit} value='Create' />
          </fieldset>
        </form>
      </div>
    );
  }
}

export default connect(null, { newSeries })(NewSeries);
