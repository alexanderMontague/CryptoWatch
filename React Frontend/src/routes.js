import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Layout from './containers/Layout/Layout';
import LoginPage from './containers/LoginModal';

const fakeAuth = {
  isAuthenticated: false
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const routes = (
  <Switch>
    <Route exact path="/" component={Layout} />
    <PrivateRoute path="/private" component={Layout} />
  </Switch>
);

export default routes;
