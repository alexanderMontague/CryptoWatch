import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Layout from './containers/Layout/Layout';
import LoginPage from './containers/LoginPage';


const fakeAuth = {
  isAuthenticated: false
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);

const routes = (
  <Switch>
    <Route exact path="/" component={Layout} />
    <Route path="/login" component={LoginPage} />
    <PrivateRoute path="/private" component={Layout} />
  </Switch>
);

export default routes;
