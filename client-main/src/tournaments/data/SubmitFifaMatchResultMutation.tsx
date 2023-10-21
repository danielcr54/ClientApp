import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation, MutationFn } from 'react-apollo';
import { CustomMutationProps } from '../../shared/types';
import { FifaMatchModel, SubmitFifaMatchResultModel } from '../types';
import { matchAttrs } from './FifaTournamentDetailsQuery';

const SUBMIT_FIFA_MATCH_RESULT_MUTATION = gql`
  mutation SubmitFifaMatchResult($input: SubmitFifaMatchResultInput!) {
    submitFifaMatchResult(input: $input) {
      match {
        ${matchAttrs}
      }
    }
  }
`;

export type SubmitFifaMatchResultFn = MutationFn<
  {
    submitFifaMatchResult: {
      match: FifaMatchModel;
    };
  },
  { input: SubmitFifaMatchResultModel }
>;

export function SubmitFifaMatchResultMutation({
  children
}: CustomMutationProps<
  {
    submitFifaMatchResult: {
      match: FifaMatchModel;
    };
  },
  { input: SubmitFifaMatchResultModel }
>) {
  return (
    <Mutation mutation={SUBMIT_FIFA_MATCH_RESULT_MUTATION}>{children}</Mutation>
  );
}
