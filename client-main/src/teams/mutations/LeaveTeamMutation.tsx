import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { CustomMutationProps } from '../../shared/types';
import { TeamModel } from '../types';

// TODO: Remove the duplication
const teamAttrs = `
  id
  name
  urlSlug
  logoUrl
  languages
  countryCode
  consoleIds
`;

const LEAVE_TEAM_MUTATION = gql`
  mutation LeaveTeam($input: LeaveTeamInput!) {
    leaveTeam(input: $input) {
      team {
        ${teamAttrs}
      }
    }
  }
`;

export function LeaveTeamMutation(
  props: CustomMutationProps<
    { leaveTeam: { team: TeamModel } },
    { input: { teamId: string } }
  >
) {
  return <Mutation {...props} mutation={LEAVE_TEAM_MUTATION} />;
}
