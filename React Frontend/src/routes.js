import React from 'react';
import { Switch, Route } from 'react-router';

import AuthWrapper from './containers/AuthWrapper/AuthWrapper';
import Layout from './containers/Layout/Layout';

const authorizedPaths = '/(auth|<more routes here>)';

const routes = (
  <Switch>
    {/* Unauth Routes */}
    <Route exact path="/" component={Layout} />

    {/* Auth Routes */}
    <Route path={authorizedPaths}>
      <AuthWrapper>
        <Route exact path="/auth" component={Layout} />
      </AuthWrapper>
    </Route>
  </Switch>
);

export default routes;
