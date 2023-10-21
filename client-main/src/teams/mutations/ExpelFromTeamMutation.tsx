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

const EXPEL_FROM_TEAM_MUTATION = gql`
  mutation ExpelFromTeam($input: ExpelFromTeamInput!) {
    expelFromTeam(input: $input) {
      team {
        ${teamAttrs}
      }
    }
  }
`;

export function ExpelFromTeamMutation(
  props: CustomMutationProps<
    { expelFromTeam: { team: TeamModel } },
    { input: { teamId: string; userId: string } }
  >
) {
  return <Mutation {...props} mutation={EXPEL_FROM_TEAM_MUTATION} />;
}
