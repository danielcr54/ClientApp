import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateTeamScreen from './CreateTeamScreen';
import TeamListScreen from './TeamListScreen';
import TeamDetailsScreen from './TeamDetailsScreen';
import TeamEditScreen from './TeamEditScreen';
import TeamInviteRequestListScreen from './TeamInviteRequestListScreen';
import TeamInviteListScreen from './TeamInviteListScreen';
import TeamMemberListScreen from './TeamMemberListScreen';
import TeamPlayerSearchScreen from './TeamPlayerSearchScreen';
import EnsureTeamOwner from './EnsureTeamOwner';

export function TeamsRoutes() {
  return (
    <Switch>
      <Route path="/teams" exact={true} component={TeamListScreen} />
      <Route path="/teams/create" exact={true} component={CreateTeamScreen} />
      <Route
        path="/teams/:urlSlug"
        exact={true}
        component={TeamDetailsScreen}
      />
      <EnsureTeamOwner>
        {() => (
          <Switch>
            <Route path="/teams/:urlSlug/edit" component={TeamEditScreen} />
            <Route
              path="/teams/:urlSlug/members/invite-requests"
              component={TeamInviteRequestListScreen}
            />
            <Route
              path="/teams/:urlSlug/members/invites"
              component={TeamInviteListScreen}
            />
            <Route
              path="/teams/:urlSlug/members/search"
              component={TeamPlayerSearchScreen}
            />
            <Route
              path="/teams/:urlSlug/members"
              component={TeamMemberListScreen}
            />
          </Switch>
        )}
      </EnsureTeamOwner>
    </Switch>
  );
}

export default TeamsRoutes;
