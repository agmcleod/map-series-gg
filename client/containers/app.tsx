import * as React from 'react';
import routes from '../routes';

import appStyles from './app.css';

export default class App extends React.Component<{}, {}> {
  static displayName = 'App';

  render() {
    return (
      <div className={appStyles.container}>
        {routes}
      </div>
    );
  }
}
