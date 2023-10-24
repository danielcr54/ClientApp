import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import * as Sentry from '@sentry/browser';
import { createBrowserHistory } from 'history';
import { Provider as UnstatedProvider, Subscribe } from 'unstated';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  Operation,
  split
} from 'apollo-boost';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { ApolloProvider } from 'react-apollo';
import axios from 'axios';
import { cache } from 'emotion';
import { CacheProvider } from '@emotion/core';
import {
  applyGlobalStyles,
  ScrollToTop,
  SentryErrorListener,
  StarBackground
} from '@igg/common';
import { SessionStateContainer, AuthenticatedProvider } from '@igg/auth';
import { config } from './config';
import AppRoutes from './AppRoutes';
import ResolveDisputeStateContainer from 'disputes/states/ResolveDisputesStateContainer';

// Setup Sentry error tracking
if (config.sentry) {
  Sentry.init({
    dsn: config.sentry
  });
}

applyGlobalStyles();

// State containers

const sessionStateContainer = new SessionStateContainer();
const resolveDisputeStateContainer = new ResolveDisputeStateContainer();

// Axios global config

axios.interceptors.request.use(cfg => {
  const { accessToken } = sessionStateContainer.state;
  if (accessToken) {
    cfg.headers.Authorization = `Bearer ${accessToken}`;
  }

  return cfg;
});

// GraphQL client

const httpLink = new HttpLink({ uri: `${config.apiUrl}/graphql` });

// Create a WebSocket link:
const wsClient = new SubscriptionClient(`${config.wsUrl}`, {
  reconnect: true,
  connectionParams: () => {
    const { accessToken } = sessionStateContainer.state;
    if (!accessToken) {
      wsClient.close();
    }
    return {
      authorization: `Bearer ${accessToken}`
    };
  }
});
const wsLink = new WebSocketLink(wsClient);

const authLink = new ApolloLink((operation, forward) => {
  const { accessToken } = sessionStateContainer.state;
  if (accessToken) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  if (!forward) return null;

  // Call the next link in the middleware chain.
  return forward(operation);
});

interface Definintion {
  kind: string;
  operation?: string;
}

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation }: Definintion = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const apolloClient = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache({
    addTypename: false
  })
});

const history = createBrowserHistory();

const Root = () => (
  <SentryErrorListener>
    <Router history={history}>
      <ScrollToTop>
        <CacheProvider value={cache}>
          <ApolloProvider client={apolloClient}>
            <UnstatedProvider
              inject={[sessionStateContainer, resolveDisputeStateContainer]}
            >
              <Subscribe to={[SessionStateContainer]}>
                {(ssc: SessionStateContainer) => (
                  <AuthenticatedProvider value={ssc.isAuthenticated()}>
                    <>
                      <StarBackground />
                      <AppRoutes />
                    </>
                  </AuthenticatedProvider>
                )}
              </Subscribe>
            </UnstatedProvider>
          </ApolloProvider>
        </CacheProvider>
      </ScrollToTop>
    </Router>
  </SentryErrorListener>
);

render(<Root />, document.getElementById('root'));
