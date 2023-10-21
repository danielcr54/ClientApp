import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation, MutationFn } from 'react-apollo';
import { CustomMutationProps } from '../../shared/types';
import { UserModel } from '../../core/types';
import {
  FifaTournamentModel,
  JoinFifaTournamentFormModel,
  FifaRoundTimeSlotModel,
  FifaMatchModel
} from '../types';

const JOIN_FIFA_TOURNAMENT_MUTATION = gql`
  mutation JoinTournament($input: JoinTournamentInput!) {
    joinTournament(input: $input) {
      firstMatch {
        homeTimeSlots {
          id
          startTime
          endTime
        }
        awayTimeSlots {
          id
          startTime
          endTime
        }
      }
    }
  }
`;

export type JoinFifaTournamentFn = MutationFn<
  {
    joinTournament: {
      user: UserModel;
      tournament: FifaTournamentModel;
      firstMatch: FifaMatchModel;
    };
  },
  { input: JoinFifaTournamentFormModel }
>;

export function JoinFifaTournamentMutation({
  children
}: CustomMutationProps<
  {
    joinTournament: {
      user: UserModel;
      tournament: FifaTournamentModel;
      firstMatch: FifaMatchModel;
    };
  },
  { input: JoinFifaTournamentFormModel }
>) {
  return (
    <Mutation mutation={JOIN_FIFA_TOURNAMENT_MUTATION}>{children}</Mutation>
  );
}
