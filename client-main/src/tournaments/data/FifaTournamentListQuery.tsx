import React, { ReactNode } from 'react';
import { gql, ApolloError } from 'apollo-boost';
import { Query } from 'react-apollo';
import { parseDate } from '../../shared/dateTimeHelpers';
import { PageInfo } from '../../core/types';
import { FifaTournamentModel } from '../types';

const userAttrs = `
  id
  username
  displayName
  profile {
    avatarUrl
    language
    countryCode
  }
`;

const teamAttrs = `
  id
  name
  urlSlug
  logoUrl
  languages
  countryCode
  consoleIds
`;

export const FIFA_TOURNAMENT_LIST_QUERY = gql`
  query FifaTournamentList($consoleId: String, $page: Int, $pageSize: Int) {
    tournaments(consoleId: $consoleId, page: $page, pageSize: $pageSize) {
      items {
        id
        title
        urlSlug
        gameMode
        type
        consoleIds
        maxPlayers
        players {
          ${userAttrs}
        }
        teams {
          ${teamAttrs}
        }
        rounds {
          id
        }
        winner {
          id
          displayName
          profile {
            avatarUrl
          }
        }
        startTime
        endTime
        status
        prizes {
          id
          name
          type
          place
        }
        matchLength
        teamSize
      }
      totalCount
    }
  }
`;

export interface FifaTournamentListQueryChildrenArg {
  loading?: boolean;
  error?: ApolloError;
  tournaments: FifaTournamentModel[];
  totalCount?: number;
  pageInfo?: PageInfo;
  searchTerm?: string;
}

export interface FifaTournamentListQueryProps {
  variables: {
    consoleId?: string;
    page?: number | string;
    pageSize?: number | string;
  };
  children?: (arg: FifaTournamentListQueryChildrenArg) => ReactNode;
  renderLoading?: () => ReactNode;
  renderError?: (error?: ApolloError) => ReactNode;
  forceRefetch?: boolean;
}

export function parseTournamentListData(tournaments: any) {
  if (!tournaments) return [];
  return tournaments.map((tournamentData: any) => {
    return {
      ...tournamentData,
      startTime: parseDate(tournamentData.startTime),
      endTime: parseDate(tournamentData.endTime)
    };
  });
}

export function FifaTournamentListQuery({
  children,
  renderLoading,
  renderError,
  forceRefetch,
  variables
}: FifaTournamentListQueryProps) {
  if (!children) return null;

  if (variables.page) {
    variables.page = Number(variables.page) || 1;
  }

  return (
    <Query
      query={FIFA_TOURNAMENT_LIST_QUERY}
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

        const resultData = (data && data.tournaments) || {};

        return children({
          loading,
          error,
          tournaments: parseTournamentListData(resultData.items || []),
          totalCount: resultData.totalCount || 0,
          pageInfo: resultData.pageInfo
        });
      }}
    </Query>
  );
}
