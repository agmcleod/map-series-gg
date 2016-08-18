// @flow

import React from 'react';
import routes from '../routes';

export default class App extends React.Component {
  static displayName = 'App';

  render() {
    return (
      <div className='container'>
        {routes}
      </div>
    );
  }
}
