import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation, MutationFn } from 'react-apollo';
import { CustomMutationProps } from 'shared/types';
import { FifaDisputeModel, FifaMatchDisputeActionType, FifaMatchModel } from 'disputes/types';
import { fifaMatchAttrs } from 'disputes/FifaMatchDisputesQuery';



const RESOLVE_DISPUTE_MUTATION = gql`
  mutation ResolveDispute($input: ApplyFifaMatchDisputeActionsInput!) {
    applyFifaMatchDisputeActions(input: $input) {
      fifaMatch {
        ${fifaMatchAttrs}
      }
    }
  }
`;

export type ResolveDisputeMutationFn = MutationFn<
  { resolveDispute: { fifaMatch: FifaMatchModel } },
  { input: {
    matchId: string,
    resolutionNote: string,
    homeScore: number,
    awayScore: number,
    homeActions: FifaMatchDisputeActionType[],
    awayActions: FifaMatchDisputeActionType[]
  }}
>;

export function ResolveDisputeMutation({
  children
} : CustomMutationProps<
    { resolveDispute: { fifaMatch: FifaMatchModel } },
    { input: {
      matchId: string,
      resolutionNote: string,
      homeScore: number,
      awayScore: number,
      homeActions: FifaMatchDisputeActionType[],
      awayActions: FifaMatchDisputeActionType[]
    }}
  >
) {
  return <Mutation mutation={RESOLVE_DISPUTE_MUTATION}>{ children }</Mutation>;
}
