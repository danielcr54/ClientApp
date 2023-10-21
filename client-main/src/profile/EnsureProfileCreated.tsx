import React, { ReactNode } from 'react';
import { Location } from 'history';
import { Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import { LoadingScreen } from '@igg/common';
import { UserModel } from '../core/types';
import { UserInfoQuery } from '../core/UserInfoQuery';
import { isProfileValid } from './profileHelpers';

function renderRedirect(location: Location<any>) {
  return (
    <Redirect
      to={{
        pathname: '/create-profile',
        state: { from: location }
      }}
    />
  );
}

export interface EnsureProfileCreatedProps extends RouteComponentProps<any> {
  children?: (currentUser: UserModel) => ReactNode;
}

export function EnsureProfileCreated({
  children,
  location
}: EnsureProfileCreatedProps) {
  if (!children) return null;

  return (
    <UserInfoQuery
      renderLoading={() => <LoadingScreen />}
      // renderError={() => renderRedirect(location)}
      forceRefetch={true}
    >
      {userInfo => {
        if (!isProfileValid(userInfo.profile)) {
          return renderRedirect(location);
        }

        return children(userInfo);
      }}
    </UserInfoQuery>
  );
}

export default withRouter(EnsureProfileCreated);
