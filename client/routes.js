import React from 'react'
import { Router, Route } from 'react-router'

import SeriesList from './components/series_list/series_list'
import ViewSeries from './components/view_series/view_series'

export default function (history) {
  return (
    <Router history={history}>
      <Route path='/' component={SeriesList} />
      <Route path='/series/:id' component={ViewSeries} />
    </Router>
  )
}
