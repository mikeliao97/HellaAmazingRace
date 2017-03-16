'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import NotFoundPage from './components/NotFoundPage';
import LoginPage from './components/LoginPage';
import CreateRace from './components/CreateRace';
import RunRace from './components/RunRace';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={LoginPage}/>
    <Route path="/home" component={IndexPage}/>
    <Route path="/CreateRace" component = {CreateRace}/>
    <Route path="/RunRace" component = {RunRace}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
