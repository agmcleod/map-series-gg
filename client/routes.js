import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import SeriesList from './components/series_list/series_list';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={SeriesList} />
  </Router>
);
