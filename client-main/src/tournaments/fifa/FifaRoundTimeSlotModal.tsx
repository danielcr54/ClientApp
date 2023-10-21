import React, { ReactNode } from 'react';
import {
  Button,
  CheckBar,
  FormElement,
  ModalState,
  ModalStateChildrenArg,
  Modal,
  StaticText
} from '@igg/common';
import { LabeledTextBlock } from '../../shared/LabeledTextBlock';
import {
  SetFifaMatchTimeSlotsMutation,
  SetFifaMatchTimeSlotsFn
} from '../data/SetFifaMatchTimeSlotsMutation';
import { FifaRoundTimeSlotForm } from './FifaRoundTimeSlotForm';
import {
  FifaTournamentRoundModel,
  FifaRoundTimeSlotModel,
  FifaRoundTimeSlotFormModel,
  FifaMatchModel
} from '../types';
import {
  formatRoundTimeString,
  formatTimeslotLabel
} from '../tournamentHelpers';

interface FifaRoundTimeSlotModal {
  children?: (arg: ModalStateChildrenArg) => ReactNode;
  timeSlots?: FifaRoundTimeSlotModel[];
  selectedTimeSlots?: FifaRoundTimeSlotModel[];
  round?: FifaTournamentRoundModel;
  join: boolean;
  success: boolean;
  loading: boolean;
  onFormSubmit: (formModel: FifaRoundTimeSlotFormModel) => Promise<any>;
}

const FifaRoundTimeSlotModal = ({
  children,
  timeSlots,
  selectedTimeSlots,
  round,
  join,
  success,
  loading,
  onFormSubmit
}: FifaRoundTimeSlotModal) => {
  return (
    <ModalState>
      {({ isOpen, open, close }) => (
        <>
          {typeof children === 'function' && children({ open, close, isOpen })}

          <Modal isOpen={isOpen} onRequestClose={!loading ? close : void 0}>
            <StaticText>
              {join && <h1>Join Tournament</h1>}

              {!join && <h1>Choose Preferred Time</h1>}

              {!!round && (
                <LabeledTextBlock
                  label={`Round ${round.order}`}
                  text={
                    round.startTime && round.endTime
                      ? formatRoundTimeString(round.startTime, round.endTime)
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
                  <h4>Times Selected!</h4>
                  {join && (
                    <p>
                      You successfully joined the tournament! We'll find an
                      opponent for you based on your choices.
                    </p>
                  )}
                  {!join && (
                    <p>
                      You successfully set the time. The exact time will be set
                      after all players have joined.
                    </p>
                  )}
                </>
              ) : (
                <>
                  <h4>Select Available Times</h4>
                  {join && (
                    <p>
                      To join this tournament, please select at least{' '}
                      <strong>two</strong> time slots that you will be available
                      to play in!
                    </p>
                  )}
                  {!join && (
                    <p>
                      Please choose the time slots you're available to play the
                      upcoming round in. Select at least 2 time slots.
                    </p>
                  )}
                </>
              )}
            </StaticText>

            {success ? (
              <div>
                <FormElement>
                  {!!selectedTimeSlots &&
                    selectedTimeSlots.map(timeSlot => (
                      <CheckBar
                        key={timeSlot.id}
                        selected={true}
                        readonly={true}
                      >
                        {formatTimeslotLabel(
                          timeSlot.startTime,
                          timeSlot.endTime
                        )}
                      </CheckBar>
                    ))}
                </FormElement>

                <Button
                  block={true}
                  large={true}
                  secondary={true}
                  onClick={close}
                >
                  OK
                </Button>
              </div>
            ) : (
              <FifaRoundTimeSlotForm
                timeSlots={timeSlots}
                onSubmit={onFormSubmit}
                inProgress={loading}
                label={'Confirm Selection'}
              />
            )}
          </Modal>
        </>
      )}
    </ModalState>
  );
};

export default FifaRoundTimeSlotModal;
