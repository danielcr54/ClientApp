import React, { ReactNode } from 'react';
import { gql, ApolloError } from 'apollo-boost';
import { Query } from 'react-apollo';
import { UserModel } from '../core/types';
import { PageInfo } from '../teams/types'; // TODO: Move into ./core/types

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
  teamId
`;

const PLAYER_LIST_QUERY = gql`
  query UserList(
    $searchTerm: String
    $hideTeams: Boolean
    $teamId: ID
    $page: Int
    $pageSize: Int
  ) {
    users(
      searchTerm: $searchTerm
      hideTeams: $hideTeams
      teamId: $teamId
      page: $page
      pageSize: $pageSize
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

export interface PlayerListQueryChildrenArg {
  loading?: boolean;
  error?: ApolloError;
  players: UserModel[];
  totalCount?: number;
  pageInfo?: PageInfo;
  searchTerm?: string;
}

export interface PlayerListQueryProps {
  variables: {
    searchTerm?: string;
    hideTeams?: boolean;
    teamId?: string;
    page?: number;
    pageSize?: number;
  };
  children?: (arg: PlayerListQueryChildrenArg) => ReactNode;
  renderLoading?: () => ReactNode;
  renderError?: (error?: ApolloError) => ReactNode;
  forceRefetch?: boolean;
}

export function PlayerListQuery({
  children,
  renderLoading,
  renderError,
  forceRefetch,
  variables
}: PlayerListQueryProps) {
  if (!children) return null;

  if (variables.page) {
    variables.page = Number(variables.page) || 1;
  }

  return (
    <Query
      query={PLAYER_LIST_QUERY}
      variables={variables}
      fetchPolicy={forceRefetch ? 'network-only' : 'cache-and-network'}
    >
      {({ loading, error, data }) => {
        if (loading && typeof renderLoading === 'function') {
          return renderLoading();
        }

        if (error && typeof renderError === 'function') {
          return renderError(error);
        }

        const playersData = (data && data.users) || {};

        return children({
          loading,
          error,
          players: playersData.items || [],
          totalCount: playersData.totalCount || 0,
          pageInfo: playersData.pageInfo,
          searchTerm: variables.searchTerm
        });
      }}
    </Query>
  );
}
