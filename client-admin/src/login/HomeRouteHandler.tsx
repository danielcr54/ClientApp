import React from 'react';
import { Route } from 'react-router-dom';
import { Subscribe } from '@igg/auth/node_modules/unstated';
import { SessionStateContainer, AuthenticatedRoute } from '@igg/auth/lib';
import LoginScreen from './LoginScreen';
import { DashboardScreen } from 'dashboard/DashboardScreen';
import EnsureAdminRights from './EnsureAdminRights';

export function HomeRouteHandler() {
  return (
    <Route
      render={(props: any) => (
        <Subscribe to={[SessionStateContainer]}>
          {(ssc: SessionStateContainer) => {
            if (ssc.isAuthenticated()) {
              return (
                <AuthenticatedRoute>
                  {() => (
                    <EnsureAdminRights>
                      {currentUser => (
                        <DashboardScreen />
                      )}
                    </EnsureAdminRights>
                  )}
                </AuthenticatedRoute>
              )
            }
            if (ssc.isAuthenticating()) return null;

            return <LoginScreen />
          }}
        </Subscribe>
      )}
    />
  );
}

export default HomeRouteHandler;
