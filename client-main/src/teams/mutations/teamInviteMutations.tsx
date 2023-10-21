import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { CustomMutationProps } from '../../shared/types';
import { TeamInviteModel } from '../types';

// TODO: Remove the duplication
const userAttrs = `
  id
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

const teamAttrs = `
  id
  name
  urlSlug
  logoUrl
  languages
  countryCode
  consoleIds
  ownerId
  owner {
    id
  }
`;

const INVITE_TO_TEAM_MUTATION = gql`
  mutation InviteToTeam($input: InviteToTeamInput!) {
    inviteToTeam(input: $input) {
      teamInvite {
        id
        userId
        user {
          ${userAttrs}
        }
        teamId
        team {
          ${teamAttrs}
        }
        status
        resolvedAt
      }
    }
  }
`;

export function InviteToTeamMutation(
  props: CustomMutationProps<
    { inviteToTeam: { teamInvite: TeamInviteModel } },
    { input: { teamId: string; userId: string } }
  >
) {
  return <Mutation {...props} mutation={INVITE_TO_TEAM_MUTATION} />;
}

function makeMutationString(actionType: 'revoke' | 'accept' | 'reject') {
  const actionTypeCapitalized = `${actionType[0].toUpperCase()}${actionType.slice(
    1
  )}`;

  return gql`
    mutation ${actionTypeCapitalized}TeamInvite(
      $input: ${actionTypeCapitalized}TeamInviteInput!
    ) {
      ${actionType}TeamInvite(input: $input) {
        teamInvite {
          id
          userId
          user {
            ${userAttrs}
          }
          teamId
          team {
            ${teamAttrs}
          }
          status
          resolvedAt
        }
      }
    }
  `;
}

const REVOKE_TEAM_INVITE_MUTATION = makeMutationString('revoke');
const ACCEPT_TEAM_INVITE_MUTATION = makeMutationString('accept');
const REJECT_TEAM_INVITE_MUTATION = makeMutationString('reject');

export function RevokeTeamInviteMutation(
  props: CustomMutationProps<
    {
      revokeTeamInvite: { teamInvite: TeamInviteModel };
    },
    { input: { teamInviteId: string } }
  >
) {
  return <Mutation {...props} mutation={REVOKE_TEAM_INVITE_MUTATION} />;
}

export function AcceptTeamInviteMutation(
  props: CustomMutationProps<
    {
      acceptTeamInvite: { teamInvite: TeamInviteModel };
    },
    { input: { teamInviteId: string } }
  >
) {
  return <Mutation {...props} mutation={ACCEPT_TEAM_INVITE_MUTATION} />;
}

export function RejectTeamInviteMutation(
  props: CustomMutationProps<
    {
      rejectTeamInvite: { teamInvite: TeamInviteModel };
    },
    { input: { teamInviteId: string } }
  >
) {
  return <Mutation {...props} mutation={REJECT_TEAM_INVITE_MUTATION} />;
}
