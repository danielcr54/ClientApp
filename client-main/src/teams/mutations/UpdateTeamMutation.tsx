import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation, MutationFn } from 'react-apollo';
import { CustomMutationProps } from '../../shared/types';
import { TeamModel } from '../types';

const UPDATE_TEAM_MUTATION = gql`
  mutation UpdateTeam($input: UpdateTeamInput!) {
    updateTeam(input: $input) {
      team {
        id
        name
        urlSlug
        logoUrl
        countryCode
        languages
        consoleIds
      }
    }
  }
`;

export type UpdateTeamFn = MutationFn<
  { updateTeam: { team: TeamModel } },
  { input: TeamModel }
>;

export function UpdateTeamMutation(
  props: CustomMutationProps<
    { updateTeam: { team: TeamModel } },
    { input: TeamModel }
  >
) {
  return <Mutation {...props} mutation={UPDATE_TEAM_MUTATION} />;
}

export default UpdateTeamMutation;
