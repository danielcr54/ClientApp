import React, { ReactNode } from 'react';
import { Location } from 'history';
import { Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import { LoadingScreen } from '@igg/common';
import { UserInfoQuery } from '../core/UserInfoQuery';

function renderRedirect(location: Location<any>) {
  return (
    <Redirect
      to={{
        pathname: '/my-team',
        state: { from: location }
      }}
    />
  );
}

export interface EnsureTeamOwnerProps extends RouteComponentProps<any> {
  children?: () => ReactNode;
}

export function EnsureTeamOwner({ children, location }: EnsureTeamOwnerProps) {
  if (!children) return null;

  return (
    <UserInfoQuery
      renderLoading={() => <LoadingScreen />}
      // renderError={() => renderRedirect(location)}
      forceRefetch={true}
    >
      {userInfo => {
        if (
          userInfo.team &&
          userInfo.team.ownerId &&
          userInfo.team.ownerId === userInfo.id
        ) {
          return children();
        }

        return renderRedirect(location);
      }}
    </UserInfoQuery>
  );
}

export default withRouter(EnsureTeamOwner);
