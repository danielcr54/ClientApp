import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  LoginScreen,
  PasswordRecoveryScreen,
  PasswordResetScreen
} from '@igg/common';
import { AuthenticatedRoute } from '@igg/auth';
import DashboardScreen from './dashboard/DashboardScreen';
import SignUpRoutes from './signup/SignUpRoutes';
import KycScreen from './kyc/KycScreen';
// import WalletRoutes from './wallet/WalletRoutes';
import AppScreenLayout from './core/AppScreenLayout';
import LogoutScreen from './core/LogoutScreen';
import EnsureProfileCreated from './profile/EnsureProfileCreated';
import CreateProfileScreen from './profile/CreateProfileScreen';
import ProfileEditScreen from './profile/ProfileEditScreen';
import AccountEditScreen from './settings/AccountEditScreen';
import ChangePasswordScreen from './settings/ChangePasswordScreen';
import TeamsRoutes from './teams/TeamsRoutes';
import CurrentUserTeamScreen from './teams/CurrentUserTeamScreen';
import PlayersRoutes from './players/PlayersRoutes';
import TournamentsRoutes from './tournaments/TournamentsRoutes';
import NewsRoutes from 'news/NewsRoutes';
import NotFoundScreen from './core/NotFoundScreen';
import CurrentUserTeamInviteRequestListScreen from './teams/CurrentUserTeamInviteRequestListScreen';
import CurrentUserTeamInviteListScreen from './teams/CurrentUserTeamInviteListScreen';
import HomeRouteHandler from 'homepage/HomeRouteHandler';
import NewsArticleDetailScreen from 'news/NewsArticleDetailScreen';
import PublicBalanceScreen from 'wallet/PublicBalanceScreen';

export function AppRoutes() {
  return (
    <Switch>
      {/* Login / Signup / Profile */}

      <Route path="/" exact={true} component={HomeRouteHandler} />

      <Route path="/create-account" component={SignUpRoutes} />
      <Route path="/signup" component={SignUpRoutes} />

      <Route path="/login" exact={true} component={LoginScreen} />
      <Route
        path="/password-recovery"
        exact={true}
        component={PasswordRecoveryScreen}
      />
      <Route
        path="/password-reset/:passwordResetToken"
        exact={true}
        component={PasswordResetScreen}
      />
      <Route path="/logout" exact={true} component={LogoutScreen} />

      <Route path="/news" component={NewsRoutes} />

      <Route path="/news.php" component={NewsArticleDetailScreen} />

      <Route path="/wallet" component={PublicBalanceScreen} />

      <AuthenticatedRoute
        path="/create-profile"
        component={CreateProfileScreen}
      />

      <AuthenticatedRoute>
        {() => (
          <EnsureProfileCreated>
            {currentUser => (
              <Switch>
                <Route
                  path="/verify-identity"
                  exact={true}
                  component={KycScreen}
                />

                <Route
                  render={() => (
                    <AppScreenLayout currentUser={currentUser}>
                      <Switch>
                        <Route
                          path="/profile/edit"
                          exact={true}
                          component={ProfileEditScreen}
                        />

                        <Route
                          path="/settings/account"
                          exact={true}
                          component={AccountEditScreen}
                        />

                        <Route
                          path="/settings/password"
                          exact={true}
                          component={ChangePasswordScreen}
                        />

                        <Route
                          path="/invite-requests"
                          exact={true}
                          component={CurrentUserTeamInviteRequestListScreen}
                        />

                        <Route
                          path="/invites"
                          exact={true}
                          component={CurrentUserTeamInviteListScreen}
                        />

                        <Route path="/teams" component={TeamsRoutes} />
                        <Route
                          path="/my-team"
                          component={CurrentUserTeamScreen}
                        />

                        <Route path="/players" component={PlayersRoutes} />

                        <Route
                          path="/tournaments"
                          component={TournamentsRoutes}
                        />

                        {/* <Route path="/wallet" component={WalletRoutes} /> */}

                        <Route component={NotFoundScreen} />
                      </Switch>
                    </AppScreenLayout>
                  )}
                />
              </Switch>
            )}
          </EnsureProfileCreated>
        )}
      </AuthenticatedRoute>
    </Switch>
  );
}

export default AppRoutes;
