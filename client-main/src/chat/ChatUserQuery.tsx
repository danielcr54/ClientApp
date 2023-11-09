import React, { ReactNode } from 'react';
import { gql, ApolloError } from 'apollo-boost';
import { Query } from 'react-apollo';
import { ChatContactModel } from './types';

export const CHAT_CONTACT_QUERY = gql`
  {
    conversations(skip: 0, limit: 20) {
      id
      conversationId
      lastReadMessageId
      user {
        id
        username
        displayName
        isActive
        teamId
        profile {
          avatarUrl
          firstName
          lastName
        }
      }
      unreadCount
      read
    }
  }
`;

export const CHAT_CONTACTS_SUBSCRIPTION = gql`
  subscription onConversation {
    conversation {
      id
      conversationId
      lastReadMessageId
      user {
        id
        username
        displayName
        isActive
        profile {
          avatarUrl
          firstName
          lastName
        }
        teamId
      }
      unreadCount
      read
    }
  }
`;

export interface ChatContactsQueryProps {
  children?: (
    conversations: ChatContactModel[],
    loading: boolean,
    subscribeToNewContacts: () => void,
    refetch: () => void
  ) => ReactNode;
  renderLoading?: () => ReactNode;
  renderError?: (error?: ApolloError) => ReactNode;
  forceRefetch?: boolean;
}

export function ChatContactsQuery({
  children,
  renderLoading,
  renderError,
  forceRefetch
}: ChatContactsQueryProps) {
  if (!children) return null;

  return (
    <Query
      query={CHAT_CONTACT_QUERY}
      partialRefetch={true}
      fetchPolicy={forceRefetch ? 'network-only' : 'cache-and-network'}
    >
      {({ data, loading, error, subscribeToMore, refetch }) => {
        // if (loading) {
        //   return typeof renderLoading === 'function' ? renderLoading() : null;
        // }
        if (error) {
          return typeof renderError === 'function' ? renderError(error) : null;
        }

        if (!data || !data.conversations) return null;
        const conversations = data.conversations as ChatContactModel[];

        const subscribeToNewContacts = () =>
          subscribeToMore({
            document: CHAT_CONTACTS_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newContacts = subscriptionData.data
                .conversation as ChatContactModel;

              if (!newContacts) {
                return prev;
              }

              return {
                ...prev,
                conversations: [...prev.conversations, newContacts]
              };
            }
          });

        return children(
          conversations,
          loading,
          subscribeToNewContacts,
          refetch
        );
      }}
    </Query>
  );
}

export default ChatContactsQuery;
