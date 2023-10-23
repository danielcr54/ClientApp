import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { CustomMutationProps } from 'shared/types';
import { fifaMatchAttrs } from 'disputes/FifaMatchDisputesQuery';
import { FifaMatchModel } from 'disputes/types';

const CLAIM_DISPUTE_MUTATION = gql`
  mutation ClaimDispute($input: ClaimFifaMatchDisputeInput!) {
    claimFifaMatchDispute(input: $input) {
      fifaMatch {
        ${fifaMatchAttrs}
      }
    }
  }
`;

export function ClaimDisputeMutation(
  props: CustomMutationProps<
    { claimFifaMatchDispute: { fifaMatch: FifaMatchModel } },
    { input: { matchId: string } }
  >
) {
  return <Mutation {...props} mutation={CLAIM_DISPUTE_MUTATION} />;
}
