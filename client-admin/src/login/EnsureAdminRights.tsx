import React, { ReactNode } from 'react';
import { Location } from 'history';
import { Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import { LoadingScreen } from '@igg/common';
import { UserModel } from './types';
import { UserInfoQuery } from './UserInfoQuery';

function renderRedirect(location: Location<any>) {
  return (
    <Redirect
      to={{
        pathname: '/logout',
        state: { from: location }
      }}
    />
  );
}

export interface EnsureAdminRightsProps extends RouteComponentProps<any> {
  children?: (currentUser: UserModel) => ReactNode;
}

export function EnsureAdminRights({
  children,
  location
}: EnsureAdminRightsProps) {
  if (!children) return null;

  return (
    <UserInfoQuery
      renderLoading={() => <LoadingScreen />}
      // renderError={() => renderRedirect(location)}
      forceRefetch={true}
    >
      {userInfo => {
        if (!userInfo.isSuperuser) {
          return renderRedirect(location);
        }

        return children(userInfo);
      }}
    </UserInfoQuery>
  );
}

export default withRouter(EnsureAdminRights);
