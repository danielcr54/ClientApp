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
  teamRole
  teamId
`;

export const TEAM_MEMBERS_METADATA_QUERY = gql`
  query TeamMembersMetadata($urlSlug: String!) {
    teamByUrlSlug(urlSlug: $urlSlug) {
      id
      name
      urlSlug
      logoUrl
      languages
      countryCode
      consoleIds
      members {
        ${userAttrs}
      }
      inviteRequests {
        id
        userId
        user {
          ${userAttrs}
        }
        teamId
        status
      }
      invites {
        id
        userId
        user {
          ${userAttrs}
        }
        teamId
        status
      }
    }
  }
`;

export interface TeamMembersMetadataQueryChildrenArg {
  team: TeamModel;
  loading?: boolean;
}

export interface TeamMembersMetadataQueryProps {
  urlSlug: string;
  children?: (arg: TeamMembersMetadataQueryChildrenArg) => ReactNode;
  renderError?: (error?: ApolloError) => ReactNode;
}

export function TeamMembersMetadataQuery({
  urlSlug,
  children,
  renderError
}: TeamMembersMetadataQueryProps) {
  if (!children) return null;

  return (
    <Query query={TEAM_MEMBERS_METADATA_QUERY} variables={{ urlSlug }}>
      {({ loading, error, data }) => {
        if (error) {
          return typeof renderError === 'function' ? renderError() : null;
        }

        if (!data || !data.teamByUrlSlug) return null;
        return children({ team: data.teamByUrlSlug, loading });
      }}
    </Query>
  );
}
