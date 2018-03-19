import React from 'react'
import { Router, Route } from 'react-router'

import Login from './containers/login'
import SeriesList from './containers/series_list'
import ViewSeries from './containers/view_series'
import RequiresAuth from './components/requiresAuth'

export default function (history) {
  return (
    <Router history={history}>
      <Route path='/login' component={Login} />
      <Route path='/' component={RequiresAuth}>
        <Route path='/' component={SeriesList} />
        <Route path='/series/:id' component={ViewSeries} />
      </Route>
    </Router>
  )
}
