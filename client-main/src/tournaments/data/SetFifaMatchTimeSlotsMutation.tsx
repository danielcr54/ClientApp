import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation, MutationFn } from 'react-apollo';
import { CustomMutationProps } from '../../shared/types';
import { FifaRoundTimeSlotModel, SetFifaMatchTimeSlotsModel } from '../types';
import { matchAttrs } from './FifaTournamentDetailsQuery';

const SET_FIFA_MATCH_TIME_SLOTS_MUTATION = gql`
  mutation SetFifaMatchTimeSlots($input: SetFifaMatchTimeSlotsInput!) {
    setFifaMatchTimeSlots(input: $input) {
      timeSlots {
        id
        startTime
        endTime
      }
    }
  }
`;

export type SetFifaMatchTimeSlotsFn = MutationFn<
  {
    setFifaMatchTimeSlots: {
      timeSlots: FifaRoundTimeSlotModel[];
    };
  },
  { input: SetFifaMatchTimeSlotsModel }
>;

export function SetFifaMatchTimeSlotsMutation({
  children
}: CustomMutationProps<
  {
    setFifaMatchTimeSlots: {
      timeSlots: FifaRoundTimeSlotModel[];
    };
  },
  { input: SetFifaMatchTimeSlotsModel }
>) {
  return (
    <Mutation mutation={SET_FIFA_MATCH_TIME_SLOTS_MUTATION}>
      {children}
    </Mutation>
  );
}
