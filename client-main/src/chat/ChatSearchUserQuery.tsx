import React, { ReactNode } from 'react';
import { gql, ApolloError } from 'apollo-boost';
import { Query } from 'react-apollo';
import { ChatContactModel } from './types';
import { UserModel } from '../core/types';

const userAttrs = `
  id
  displayName
  username
  profile {
    avatarUrl
    firstName
    lastName
    language
    countryCode
  }
  teamRole
`;

const CHAT_SEARCH_USER_QUERY = gql`
  query UserList(
    $searchTerm: String
  ) {
    users(
      searchTerm: $searchTerm
      hideTeams: false
      teamId: 0
      page: 0
      pageSize: 20
    ) {
      items {
        ${userAttrs}
      }
      totalCount
      pageInfo {
        page
        pageSize
      }
    }
  }
`;

export interface ChatSearchUserQueryChildrenArgs {
  contacts: ChatContactModel[];
  loading: boolean;
  error?: ApolloError;
  totalCount?: number;
}

export interface ChatSearchUserQueryProps {
  variables: {
    searchTerm?: string;
  };
  children?: (arg: ChatSearchUserQueryChildrenArgs) => ReactNode;
  renderLoading?: () => ReactNode;
  renderError?: (error?: ApolloError) => ReactNode;
  forceRefetch?: boolean;
}

export function ChatSearchUserQuery({
  variables,
  children,
  renderLoading,
  renderError,
  forceRefetch
}: ChatSearchUserQueryProps) {
  if (!children) return null;
  return (
    <Query
      query={CHAT_SEARCH_USER_QUERY}
      variables={variables}
      fetchPolicy={forceRefetch ? 'network-only' : 'cache-and-network'}
    >
      {({ data, loading, error }) => {
        if (error) {
          return typeof renderError === 'function' ? renderError(error) : null;
        }

        if (!data || !data.users) return null;
        const playersData: ChatContactModel[] = (data.users || []).items.map(
          (user: UserModel) => ({
            user
          })
        );

        return children({
          contacts: playersData,
          loading,
          error,
          totalCount: playersData.length || 0
        });
      }}
    </Query>
  );
}

export default ChatSearchUserQuery;
