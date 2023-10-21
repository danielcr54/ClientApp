import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { CustomMutationProps } from '../../shared/types';
import { TeamInviteRequestModel } from '../types';

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

const REQUEST_TEAM_INVITE_MUTATION = gql`
  mutation RequestTeamInvite($input: RequestTeamInviteInput!) {
    requestTeamInvite(input: $input) {
      teamInviteRequest {
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

export function RequestTeamInviteMutation(
  props: CustomMutationProps<
    { requestTeamInvite: { teamInviteRequest: TeamInviteRequestModel } },
    { input: { teamId: string } }
  >
) {
  return <Mutation {...props} mutation={REQUEST_TEAM_INVITE_MUTATION} />;
}

function makeMutationString(actionType: 'cancel' | 'accept' | 'reject') {
  const actionTypeCapitalized = `${actionType[0].toUpperCase()}${actionType.slice(
    1
  )}`;

  return gql`
    mutation ${actionTypeCapitalized}TeamInviteRequest(
      $input: ${actionTypeCapitalized}TeamInviteRequestInput!
    ) {
      ${actionType}TeamInviteRequest(input: $input) {
        teamInviteRequest {
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

const CANCEL_TEAM_INVITE_REQUEST_MUTATION = makeMutationString('cancel');
const ACCEPT_TEAM_INVITE_REQUEST_MUTATION = makeMutationString('accept');
const REJECT_TEAM_INVITE_REQUEST_MUTATION = makeMutationString('reject');

export function CancelTeamInviteRequestMutation(
  props: CustomMutationProps<
    {
      cancelTeamInviteRequest: {
        teamInviteRequest: TeamInviteRequestModel;
      };
    },
    { input: { teamInviteRequestId: string } }
  >
) {
  return <Mutation {...props} mutation={CANCEL_TEAM_INVITE_REQUEST_MUTATION} />;
}

export function AcceptTeamInviteRequestMutation(
  props: CustomMutationProps<
    {
      acceptTeamInviteRequest: {
        teamInviteRequest: TeamInviteRequestModel;
      };
    },
    { input: { teamInviteRequestId: string } }
  >
) {
  return <Mutation {...props} mutation={ACCEPT_TEAM_INVITE_REQUEST_MUTATION} />;
}

export function RejectTeamInviteRequestMutation(
  props: CustomMutationProps<
    {
      rejectTeamInviteRequest: {
        teamInviteRequest: TeamInviteRequestModel;
      };
    },
    { input: { teamInviteRequestId: string } }
  >
) {
  return <Mutation {...props} mutation={REJECT_TEAM_INVITE_REQUEST_MUTATION} />;
}
