import React, { ReactNode } from 'react';
import { gql, ApolloError } from 'apollo-boost';
import { Query } from 'react-apollo';
import { UserModel } from '../core/types';

const PLAYER_DETAILS_QUERY = gql`
  query PlayerDetails($username: String!) {
    userByUsername(username: $username) {
      id
      displayName
      username
      profile {
        firstName
        lastName
        countryCode
        language
        dateOfBirth
        avatarUrl
        psnUsername
        xboxUsername
        youTubeUrl
        twitchUrl
        facebookUrl
        twitterUrl
        steamUsername
        discordUrl
      }
      team {
        id
        name
        urlSlug
        logoUrl
        languages
        countryCode
        members {
          id
        }
      }
      teamRole
      createdAt
    }
  }
`;

export interface PlayerDetailsQueryProps {
  username: string;
  children?: (player: UserModel) => ReactNode;
  renderLoading?: () => ReactNode;
  renderError?: (error?: ApolloError) => ReactNode;
  forceRefetch?: boolean;
}

export function PlayerDetailsQuery({
  username,
  children,
  renderLoading,
  renderError,
  forceRefetch
}: PlayerDetailsQueryProps) {
  if (!children) return null;

  return (
    <Query query={PLAYER_DETAILS_QUERY} variables={{ username }}>
      {({ loading, error, data }) => {
        if (loading) {
          return typeof renderLoading === 'function' ? renderLoading() : null;
        }
        if (error) {
          console.error(error);
          return typeof renderError === 'function' ? renderError() : null;
        }

        if (!data) return null;
        const player = data.userByUsername as UserModel;

        return children(player);
      }}
    </Query>
  );
}
