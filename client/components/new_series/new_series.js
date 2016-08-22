// @flow

import React from 'react';
import styles from './new_series_styles.css';
import formStyles from '../../globalstyles/form.css';

export default class NewSeries extends React.Component {
  render() {
    return (
      <div>
        <h2>New Series</h2>
        <form>
          <fieldset className={styles.fieldset}>
            <div className={formStyles.fieldGroup}>
              <label htmlFor='name'>Name of the series:</label>
              <input type='text' id='name' className={formStyles.textField} />
            </div>
            <div className={formStyles.fieldGroup}>
              <label htmlFor='series-maps'>Paste or type map list below. Each one line by line.</label>
              <textarea className={styles.textarea} id='series-maps' />
            </div>
            <input type='submit' className={formStyles.submit} value='Create' />
          </fieldset>
        </form>
      </div>
    );
  }
}
