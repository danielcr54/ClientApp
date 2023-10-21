import React, { ReactNode } from 'react';
import { gql, ApolloError } from 'apollo-boost';
import { Query } from 'react-apollo';
import { FifaMatchModel } from './types';

const userAttrs = `
  id
  username
  profile {
    avatarUrl
    firstName
    lastName
  }
`;

const scoreSubAttrs = `
  ownScore
  opponentScore
  screenshotUrls
`;

export const fifaMatchAttrs = `
  id
  tournament {
    title
    consoleIds
    gameMode
  }
  round {
    type
  }
  homePlayer {
    ${userAttrs}
  }
  awayPlayer {
    ${userAttrs}
  }
  homeStreamUrl
  awayStreamUrl
  homeScoreSubmission {
    ${scoreSubAttrs}
  }
  awayScoreSubmission {
    ${scoreSubAttrs}
  }
  disputes {
    reason
    comment
    createdBy {
      ${userAttrs}
    }
    player {
      ${userAttrs}
    }
  }
  disputeClaimedBy {
    ${userAttrs}
  }
  disputeResolutionNote
  disputeResolvedAt
  disputeActions {
    match {
      id
    }
    player {
      ${userAttrs}
    }
    type
  }
`;

export const FIFA_MATCHES_DISPUTES_QUERY = gql`
  { fifaMatchesWithUnresolvedDisputes {
    ${fifaMatchAttrs}
  }}
`;

export interface FifaMatchDisputesQueryChildrenArg {
  loading?: boolean;
  error?: ApolloError;
  fifaMatches: FifaMatchModel[];
}

export interface FifaMatchDisputesQueryProps {
  children?: (arg: FifaMatchDisputesQueryChildrenArg) => ReactNode;
  renderLoading?: () => ReactNode;
  renderError?: (error?: ApolloError) => ReactNode;
  forceRefetch?: boolean;
}

export function FifaMatchDisputesQuery({
  children,
  renderLoading,
  renderError,
  forceRefetch
}: FifaMatchDisputesQueryProps) {
  if (!children) return null;

  return (
    <Query
      query={FIFA_MATCHES_DISPUTES_QUERY}
      fetchPolicy={forceRefetch ? 'network-only' : 'cache-and-network'}
    >
      {({ loading, error, data }) => {
        if (loading && typeof renderLoading === 'function') {
          return renderLoading();
        }

        if (error && typeof renderError === 'function') {
          return renderError(error);
        }

        const fifaMatches = (data && data.fifaMatchesWithUnresolvedDisputes) || {};

        return children({
          loading,
          error,
          fifaMatches: fifaMatches || [],
        });
      }}
    </Query>
  );
}
