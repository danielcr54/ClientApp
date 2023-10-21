import React, { ReactNode } from 'react';
import { gql, ApolloError } from 'apollo-boost';
import { Query } from 'react-apollo';
import { NotificationModel, NotificationType } from './types';
import { USER_INFO_QUERY } from '../core/UserInfoQuery';

export const NOTIFICATIONS_QUERY = gql`
  {
    notifications(skip: 0, limit: 100) {
      id
      title
      description
      targetUserId
      type
      eventTime
      avatarUrl
      username
      meta
    }
  }
`;

export const NOTIFICATIONS_SUBSCRIPTION = gql`
  subscription onNotification {
    notification {
      id
      title
      description
      targetUserId
      type
      eventTime
      avatarUrl
      username
      meta
    }
  }
`;

export interface NotificationsQueryProps {
  children?: (
    notificationList: NotificationModel[],
    subscribeToNewNotifications: () => any
  ) => ReactNode;
  renderLoading?: () => ReactNode;
  renderError?: (error?: ApolloError) => ReactNode;
  forceRefetch?: boolean;
}

export function NotificationsQuery({
  children,
  renderLoading,
  renderError,
  forceRefetch
}: NotificationsQueryProps) {
  if (!children) return null;

  return (
    <Query
      query={NOTIFICATIONS_QUERY}
      partialRefetch={true}
      fetchPolicy={forceRefetch ? 'network-only' : 'cache-and-network'}
    >
      {({ data, loading, error, subscribeToMore, client }) => {
        if (loading) {
          return typeof renderLoading === 'function' ? renderLoading() : null;
        }
        if (error) {
          return typeof renderError === 'function' ? renderError(error) : null;
        }

        if (!data || !data.notifications) return null;
        const notifications = data.notifications as NotificationModel[];

        const subscribeToNewNotifications = () =>
          subscribeToMore({
            document: NOTIFICATIONS_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newFeedItem = subscriptionData.data
                .notification as NotificationModel;
              if (newFeedItem.type === NotificationType.TEAM_CREATE_ENABLED) {
                client.query({
                  fetchPolicy: 'network-only',
                  query: USER_INFO_QUERY
                });
              }

              if (!newFeedItem) {
                return prev;
              }

              return {
                ...prev,
                notifications: [newFeedItem, ...prev.notifications]
              };
            }
          });

        return children(notifications, subscribeToNewNotifications);
      }}
    </Query>
  );
}

export default NotificationsQuery;
