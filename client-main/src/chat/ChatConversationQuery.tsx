import React, { ReactNode } from 'react';
import { gql, ApolloError } from 'apollo-boost';
import { Query, Subscription } from 'react-apollo';
import { ChatConversationModel } from './types';

export const CHAT_CONVERSATION_SUBSCRIPTION = gql`
  subscription onChat {
    chat {
      id
      fromUserId
      conversationId
      type
      message
    }
  }
`;

export const CHAT_CONVERSATION_QUERY = gql`
  query Conversations($conversationId: String!) {
    conversationMessages(conversationId: $conversationId, skip: 0, limit: 20) {
      id
      fromUserId
      conversationId
      type
      message
    }
  }
`;

export interface ChatConversationSubscriptionProps {
  onNewMessage: () => void
}

export function ChatConversationSubscription({ onNewMessage }: ChatConversationSubscriptionProps) {
  return (
    <Subscription
      subscription={CHAT_CONVERSATION_SUBSCRIPTION}
      onSubscriptionData={onNewMessage}
    />
  )
}

export interface ChatConversationQueryProps {
  children?: (
    conversationMessages: ChatConversationModel[],
    subscribeToNewMessages: () => any
  ) => ReactNode;
  renderLoading?: () => ReactNode;
  renderError?: (error?: ApolloError) => ReactNode;
  forceRefetch?: boolean;
  conversationId: string;
}

export function ChatConversationQuery({
  children,
  renderLoading,
  renderError,
  forceRefetch,
  conversationId
}: ChatConversationQueryProps) {
  if (!children) return null;

  return (
    <Query
      query={CHAT_CONVERSATION_QUERY}
      variables={{ conversationId }}
      partialRefetch={true}
      fetchPolicy={forceRefetch ? 'network-only' : 'cache-and-network'}
    >
      {({ data, loading, error, subscribeToMore }) => {
        if (loading) {
          return typeof renderLoading === 'function' ? renderLoading() : null;
        }
        if (error) {
          return typeof renderError === 'function' ? renderError(error) : null;
        }

        if (!data || !data.conversationMessages) return null;
        const conversationMessages = data.conversationMessages as ChatConversationModel[];

        const subscribeToNewMessages = () =>
          subscribeToMore({
            document: CHAT_CONVERSATION_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newMessages = subscriptionData.data.chat as ChatConversationModel;

              if (!newMessages) {
                return prev;
              }

              if (newMessages.conversationId !== conversationId) {
                return prev;
              }

              return {
                ...prev,
                conversationMessages: [newMessages, ...prev.conversationMessages]
              };
            }
          });

        return children(conversationMessages, subscribeToNewMessages);
      }}
    </Query>
  );
}

export default ChatConversationQuery;
