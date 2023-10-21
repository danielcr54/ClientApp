import React, { ReactNode, ComponentType } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { Subscribe } from 'unstated';
import { SessionStateContainer } from './SessionStateContainer';

export interface AuthenticatedRouteProps extends RouteProps {
  component?: ComponentType;
  children?: (props: any) => ReactNode;
  otherwiseRedirectTo?: string;
}

export function AuthenticatedRoute({
  children,
  component,
  otherwiseRedirectTo,
  ...rest
}: AuthenticatedRouteProps) {
  function renderComponent(props: any) {
    if (typeof children === 'function') {
      return children(props);
    }

    const RouteComponent = component;

    if (RouteComponent) {
      return <RouteComponent {...props} />;
    }

    return null;
  }

  return (
    <Route
      {...rest}
      render={(props: any) => (
        <Subscribe to={[SessionStateContainer]}>
          {(ssc: SessionStateContainer) => {
            if (ssc.isAuthenticated()) return renderComponent(props);
            if (ssc.isAuthenticating()) return null;

            return (
              <Redirect
                to={{
                  pathname: otherwiseRedirectTo || '/',
                  state: { from: props.location }
                }}
              />
            );
          }}
        </Subscribe>
      )}
    />
  );
}

export default AuthenticatedRoute;
