import React from 'react';
import * as Sentry from '@sentry/browser';
import ErrorScreen from './ErrorScreen';
import { Link } from 'react-router-dom';

export interface SentryErrorListenerState {
  error?: any;
}

export class SentryErrorListener extends React.Component<
  {},
  SentryErrorListenerState
> {
  state: SentryErrorListenerState = {};

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({ error });
    Sentry.withScope((scope: any) => {
      Object.keys(errorInfo).forEach(key =>
        scope.setExtra(key, errorInfo[key])
      );
      Sentry.captureException(error);
    });
  }

  render() {
    const { error } = this.state;
    if (!!error) {
      Sentry.showReportDialog();
      return (
        <ErrorScreen title="An Unknown Error Occured!">
          <a href="/">Escape to safety!</a>
        </ErrorScreen>
      );
    } else {
      return this.props.children;
    }
  }
}
