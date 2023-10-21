import React from 'react';
import { StaticText, Button, CheckBar, FormElement } from '@igg/common';
import { LabeledTextBlock } from '../../shared/LabeledTextBlock';
import { JoinFifaTournamentForm } from './JoinFifaTournamentForm';
import {
  FifaTournamentModel,
  JoinFifaTournamentFormModel,
  FifaRoundTimeSlotModel
} from '../types';
import {
  formatRoundTimeString,
  formatTimeslotLabel
} from '../tournamentHelpers';

function renderJoinSuccessPane(
  selectedTimeSlots?: FifaRoundTimeSlotModel[],
  onSuccessConfirmClick?: (event?: any) => void
) {
  return (
    <div>
      <FormElement>
        {!!selectedTimeSlots &&
          selectedTimeSlots.map(timeSlot => (
            <CheckBar key={timeSlot.id} selected={true} readonly={true}>
              {formatTimeslotLabel(timeSlot.startTime, timeSlot.endTime)}
            </CheckBar>
          ))}
      </FormElement>

      <Button
        block={true}
        large={true}
        secondary={true}
        onClick={onSuccessConfirmClick}
      >
        OK
      </Button>
    </div>
  );
}

export interface JoinFifaTournamentModalContentProps {
  tournament: FifaTournamentModel;
  onSuccessConfirmClick?: (event?: any) => void;
  onFormSubmit: (formModel: JoinFifaTournamentFormModel) => Promise<any>;
  joining?: boolean;
  success?: boolean;
  selectedTimeSlots?: FifaRoundTimeSlotModel[];
}

export function JoinFifaTournamentModalContent({
  tournament,
  onFormSubmit,
  onSuccessConfirmClick,
  joining,
  success,
  selectedTimeSlots
}: JoinFifaTournamentModalContentProps) {
  const upcomingRound =
    tournament.rounds && tournament.rounds.length
      ? tournament.rounds[0]
      : void 0;

  return (
    <>
      <StaticText>
        <h1>Join Tournament</h1>

        {!!upcomingRound && (
          <LabeledTextBlock
            label={`Round ${upcomingRound.order}`}
            text={
              upcomingRound.startTime && upcomingRound.endTime
                ? formatRoundTimeString(
                    upcomingRound.startTime,
                    upcomingRound.endTime
                  )
                : "Time hasn't been set yet"
            }
            large={true}
            brightLabel={true}
            noWrap={true}
          />
        )}

        <br />

        {success ? (
          <>
            <h4>Time set</h4>
            <p>
              You successfully joined the tournament. The exact time will be set
              after all players have joined.
            </p>
          </>
        ) : (
          <>
            <h4>Select available time</h4>
            <p>
              In order to join a tournament, please choose the time slots you're
              available to play the upcoming round in. Select at least 2 time
              slots.
            </p>
          </>
        )}
      </StaticText>

      {success ? (
        renderJoinSuccessPane(selectedTimeSlots, onSuccessConfirmClick)
      ) : (
        <JoinFifaTournamentForm
          timeSlots={upcomingRound ? upcomingRound.timeSlots : void 0}
          onSubmit={onFormSubmit}
          inProgress={joining}
        />
      )}
    </>
  );
}
