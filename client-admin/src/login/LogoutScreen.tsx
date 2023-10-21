import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Subscribe } from 'unstated';
import { SessionStateContainer } from '@igg/auth';

interface LogoutScreenProps {
  sessionContainer: SessionStateContainer;
}

export class LogoutScreen extends Component<LogoutScreenProps> {
  componentDidMount() {
    this.props.sessionContainer.logout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

export function LogoutScreenConnected() {
  return (
    <Subscribe to={[SessionStateContainer]}>
      {(session: SessionStateContainer) => (
        <LogoutScreen sessionContainer={session} />
      )}
    </Subscribe>
  );
}

export default withRouter(LogoutScreenConnected);
