import React, { ReactNode } from 'react';
import { gql, ApolloError } from 'apollo-boost';
import { Query } from 'react-apollo';
import { TeamModel } from './types';

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
  teamId
  teamRole
`;

export const TEAM_DETAILS_QUERY = gql`
  query TeamDetails($urlSlug: String!) {
    teamByUrlSlug(urlSlug: $urlSlug) {
      id
      name
      urlSlug
      logoUrl
      languages
      countryCode
      consoleIds
      owner {
        ${userAttrs}
      }
      members {
        ${userAttrs}
      }
      inviteRequests {
        id
      }
    }
  }
`;

export interface TeamDetailsQueryProps {
  urlSlug: string;
  children?: (team: TeamModel) => ReactNode;
  renderLoading?: () => ReactNode;
  renderError?: (error?: ApolloError) => ReactNode;
  forceRefetch?: boolean;
}

export function TeamDetailsQuery({
  urlSlug,
  children,
  renderLoading,
  renderError,
  forceRefetch
}: TeamDetailsQueryProps) {
  if (!children) return null;

  return (
    <Query query={TEAM_DETAILS_QUERY} variables={{ urlSlug }}>
      {({ loading, error, data }) => {
        if (loading) {
          return typeof renderLoading === 'function' ? renderLoading() : null;
        }
        if (error) {
          return typeof renderError === 'function' ? renderError() : null;
        }

        if (!data || !data.teamByUrlSlug) return null;
        return children(data.teamByUrlSlug);
      }}
    </Query>
  );
}
