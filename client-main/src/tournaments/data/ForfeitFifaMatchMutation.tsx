import React, { ReactNode } from 'react';
import { gql } from 'apollo-boost';
import { Mutation, MutationFn, MutationResult } from 'react-apollo';
import { CustomMutationProps } from '../../shared/types';
import { UserModel } from '../../core/types';
import { TeamModel } from '../../teams/types';
import { FifaMatchModel, ForfeitFifaMatchModel } from '../types';

const FORFEIT_FIFA_MATCH_MUTATION = gql`
  mutation ForfeitFifaMatch($input: ForfeitFifaMatchInput!) {
    forfeitFifaMatch(input: $input) {
      match {
        id
        homeForfeit {
          reason
          comment
          forfeitedAt
        }
        awayForfeit {
          reason
          comment
          forfeitedAt
        }
      }
    }
  }
`;

export type ForfeitFifaMatchFn = MutationFn<
  {
    forfeitFifaMatch: {
      match: FifaMatchModel;
    };
  },
  { input: ForfeitFifaMatchModel }
>;

export function ForfeitFifaMatchMutation({
  children
}: CustomMutationProps<
  {
    forfeitFifaMatch: {
      match: FifaMatchModel;
    };
  },
  { input: ForfeitFifaMatchModel }
>) {
  return <Mutation mutation={FORFEIT_FIFA_MATCH_MUTATION}>{children}</Mutation>;
}
