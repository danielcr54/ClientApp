import React from 'react';
import { RouteComponentProps, withRouter, Redirect } from 'react-router';
import { LoadingScreen } from '@igg/common';
import { UserInfoQuery } from '../core/UserInfoQuery';
import TeamDetailsScreen from './TeamDetailsScreen';

// This component is just a convenience proxy to `TeamDetailsScreen`

export function CurrentUserTeamScreen({
  ...routeComponentProps
}: RouteComponentProps) {
  return (
    <UserInfoQuery renderLoading={() => <LoadingScreen />} forceRefetch={true}>
      {currentUser => {
        const teamUrlSlug =
          currentUser && currentUser.team && currentUser.team.urlSlug;

        if (!teamUrlSlug) return <Redirect to="/404" />;

        return (
          <TeamDetailsScreen
            {...routeComponentProps}
            match={{
              ...routeComponentProps.match,
              params: { urlSlug: teamUrlSlug }
            }}
          />
        );
      }}
    </UserInfoQuery>
  );
}

export default withRouter(CurrentUserTeamScreen);
