import React, { ReactNode } from 'react';
import { AuthenticatedConsumer } from './AuthenticatedContext';

export interface Props {
  children?: ReactNode;
}

export function NonAuthenticated({ children }: Props) {
  return (
    <AuthenticatedConsumer>
      {(isAuthenticated) => (!isAuthenticated && children) || null}
    </AuthenticatedConsumer>
  );
}

export default NonAuthenticated;
