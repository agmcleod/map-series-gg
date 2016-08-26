import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import SeriesList from './components/series_list/series_list';
import ViewSeries from './components/view_series/view_series';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={SeriesList} />
    <Route path="/series/:id" component={ViewSeries} />
  </Router>
);
