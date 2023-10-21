import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthenticatedRoute } from '@igg/auth';
import HomeRouteHandler from 'login/HomeRouteHandler';
import LogoutScreen from 'login/LogoutScreen';
import EnsureAdminRights from 'login/EnsureAdminRights';
import DisputesScreen from 'disputes/DisputesScreen';

export function AppRoutes() {
  return (
    <Switch>
      <Route path="/" exact={true} component={HomeRouteHandler} />

      <Route path="/logout" exact={true} component={LogoutScreen} />

      <AuthenticatedRoute>
        {() => (
          <EnsureAdminRights>
            {currentUser => (
              <Switch>
                <Route
                  path="/disputes"
                  exact={true}
                  component={DisputesScreen}
                />
              </Switch>
            )}
          </EnsureAdminRights>
        )}
      </AuthenticatedRoute>
    </Switch>
  );
}

export default AppRoutes;
