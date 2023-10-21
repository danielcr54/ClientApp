import React from 'react';
import { Route } from 'react-router-dom';
import { Subscribe } from '@igg/auth/node_modules/unstated';
import { SessionStateContainer, AuthenticatedRoute } from '@igg/auth/lib';
import LandingPageScreen from './LandingPageScreen';
import { DashboardScreen } from 'dashboard/DashboardScreen';
import EnsureProfileCreated from 'profile/EnsureProfileCreated';
import AppScreenLayout from 'core/AppScreenLayout';

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
                    <EnsureProfileCreated>
                      {currentUser => (
                        <AppScreenLayout currentUser={currentUser}>
                          <DashboardScreen currentUser={currentUser} />
                        </AppScreenLayout>
                      )}
                    </EnsureProfileCreated>
                  )}
                </AuthenticatedRoute> 
              )
            }
            if (ssc.isAuthenticating()) return null;

            return <LandingPageScreen />
          }}
        </Subscribe>
      )}
    />
  );
}

export default HomeRouteHandler;
