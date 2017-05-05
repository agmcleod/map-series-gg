import * as React from 'react';
import appStyles from './app.css';

export default class App extends React.Component {
  static displayName = 'App';
  static propTypes = {
    routes: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <div className={appStyles.container}>
        {this.props.routes}
      </div>
    );
  }
}
