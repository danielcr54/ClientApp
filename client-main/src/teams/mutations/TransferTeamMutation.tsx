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

const TRANSFER_TEAM_MUTATION = gql`
  mutation TransferTeam($input: TransferTeamInput!) {
    transferTeam(input: $input) {
      team {
        ${teamAttrs}
      }
    }
  }
`;

export function TransferTeamMutation(
  props: CustomMutationProps<
    { transferTeam: { team: TeamModel } },
    { input: { teamId: string; userId: string } }
  >
) {
  return <Mutation {...props} mutation={TRANSFER_TEAM_MUTATION} />;
}
