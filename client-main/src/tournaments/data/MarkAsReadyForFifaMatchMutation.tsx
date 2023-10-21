import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation, MutationFn } from 'react-apollo';
import { CustomMutationProps } from '../../shared/types';
import { FifaMatchModel, MarkAsReadyForFifaMatchModel } from '../types';
import { matchAttrs } from './FifaTournamentDetailsQuery';

const MARK_AS_READY_FOR_FIFA_MATCH_MUTATION = gql`
  mutation MarkAsReadyForFifaMatch($input: MarkAsReadyForFifaMatchInput!) {
    markAsReadyForFifaMatch(input: $input) {
      match {
        ${matchAttrs}
      }
    }
  }
`;

export type MarkAsReadyForFifaMatchFn = MutationFn<
  {
    markAsReadyForFifaMatch: {
      match: FifaMatchModel;
    };
  },
  { input: MarkAsReadyForFifaMatchModel }
>;

export function MarkAsReadyForFifaMatchMutation({
  children
}: CustomMutationProps<
  {
    markAsReadyForFifaMatch: {
      match: FifaMatchModel;
    };
  },
  { input: MarkAsReadyForFifaMatchModel }
>) {
  return (
    <Mutation mutation={MARK_AS_READY_FOR_FIFA_MATCH_MUTATION}>
      {children}
    </Mutation>
  );
}
