import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/layout';
import LandingPage from './components/LandingPage'

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={LandingPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;