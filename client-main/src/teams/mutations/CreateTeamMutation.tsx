import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation, MutationFn } from 'react-apollo';
import { CustomMutationProps } from '../../shared/types';
import { TeamModel } from '../types';

const CREATE_TEAM_MUTATION = gql`
  mutation CreateTeam($input: CreateTeamInput!) {
    createTeam(input: $input) {
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

const CREATE_TEAM_REQUEST_MUTATION = gql`
  mutation CreateTeamRequest($input: String) {
    saveTeamCreateRequest(transactionId: $input)
  }
`;

export type CreateTeamFn = MutationFn<
  { createTeam: { team: TeamModel } },
  { input: TeamModel }
>;

export function CreateTeamMutation(
  props: CustomMutationProps<
    { createTeam: { team: TeamModel } },
    { input: TeamModel }
  >
) {
  return <Mutation {...props} mutation={CREATE_TEAM_MUTATION} />;
}

export type CreateTeamRequestFn = MutationFn<
  { saveTeamCreateRequest: string },
  { input: string }
>;

export function CreateTeamRequestMutation(
  props: CustomMutationProps<
    { saveTeamCreateRequest: string },
    { input: string }
  >
) {
  return <Mutation {...props} mutation={CREATE_TEAM_REQUEST_MUTATION} />;
}

export default CreateTeamMutation;
