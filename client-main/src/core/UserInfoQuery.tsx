import React, { ReactNode } from 'react';
import { gql, ApolloError } from 'apollo-boost';
import { Query } from 'react-apollo';
import { UserModel } from './types';

export const USER_INFO_QUERY = gql`
  {
    userInfo {
      id
      displayName
      username
      email
      isActive
      isEmailVerified
      isKycPassed
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
      teamId
      team {
        id
        name
        urlSlug
        logoUrl
        ownerId
      }
      teamRole
      teamInviteRequests {
        id
        teamId
        team {
          id
          name
          urlSlug
          logoUrl
          countryCode
          languages
          consoleIds
          members {
            id
            username
          }
        }
        userId
        status
      }
      teamInvites {
        id
        teamId
        team {
          id
          name
          urlSlug
          logoUrl
          countryCode
          languages
          consoleIds
          members {
            id
            username
          }
        }
        userId
        status
      }
      canCreateTeam
      createdAt
    }
  }
`;

export interface UserInfoQueryProps {
  children?: (userInfo: UserModel) => ReactNode;
  renderLoading?: () => ReactNode;
  renderError?: (error?: ApolloError) => ReactNode;
  forceRefetch?: boolean;
}

export function UserInfoQuery({
  children,
  renderLoading,
  renderError,
  forceRefetch
}: UserInfoQueryProps) {
  if (!children) return null;

  return (
    <Query
      query={USER_INFO_QUERY}
      partialRefetch={true}
      fetchPolicy={forceRefetch ? 'network-only' : 'cache-and-network'}
    >
      {({ data, loading, error }) => {
        if (loading) {
          return typeof renderLoading === 'function' ? renderLoading() : null;
        }
        if (error) {
          return typeof renderError === 'function' ? renderError(error) : null;
        }

        if (!data || !data.userInfo) return null;
        const userInfo = data.userInfo as UserModel;

        return children(userInfo);
      }}
    </Query>
  );
}
