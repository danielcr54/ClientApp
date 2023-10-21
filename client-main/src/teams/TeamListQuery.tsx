import React, { ReactNode } from 'react';
import { gql, ApolloError } from 'apollo-boost';
import { Query } from 'react-apollo';
import { TeamModel, PageInfo } from './types';

const TEAM_LIST_QUERY = gql`
  query TeamList(
    $searchTerm: String
    $consoleId: String
    $page: Int
    $pageSize: Int
  ) {
    teams(
      searchTerm: $searchTerm
      consoleId: $consoleId
      page: $page
      pageSize: $pageSize
    ) {
      items {
        id
        name
        urlSlug
        languages
        countryCode
        logoUrl
        owner {
          id
          username
        }
        members {
          id
          username
        }
      }
      totalCount
      pageInfo {
        page
        pageSize
      }
    }
  }
`;

export interface TeamListQueryChildrenArg {
  loading?: boolean;
  error?: ApolloError;
  teams: TeamModel[];
  totalCount?: number;
  pageInfo?: PageInfo;
  searchTerm?: string;
}

export interface TeamListQueryProps {
  variables: {
    searchTerm?: string;
    consoleId?: string;
    page?: number | string;
    pageSize?: number | string;
  };
  children?: (arg: TeamListQueryChildrenArg) => ReactNode;
  renderLoading?: () => ReactNode;
  renderError?: (error?: ApolloError) => ReactNode;
  forceRefetch?: boolean;
}

export function TeamListQuery({
  children,
  renderLoading,
  renderError,
  forceRefetch,
  variables
}: TeamListQueryProps) {
  if (!children) return null;

  if (variables.page) {
    variables.page = Number(variables.page) || 1;
  }

  return (
    <Query
      query={TEAM_LIST_QUERY}
      variables={{ ...variables }}
      fetchPolicy={forceRefetch ? 'network-only' : 'cache-and-network'}
    >
      {({ loading, error, data }) => {
        if (loading && typeof renderLoading === 'function') {
          return renderLoading();
        }

        if (error && typeof renderError === 'function') {
          return renderError(error);
        }

        const teamsData = (data && data.teams) || {};

        return children({
          loading,
          error,
          teams: teamsData.items || [],
          totalCount: teamsData.totalCount || 0,
          pageInfo: teamsData.pageInfo,
          searchTerm: variables.searchTerm
        });
      }}
    </Query>
  );
}
