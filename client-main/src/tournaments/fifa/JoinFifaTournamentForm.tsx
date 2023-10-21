import React from 'react';
import { Form } from 'react-final-form';
import {
  FormActions,
  FormActionsContent,
  FormElement,
  SubmitButton,
  FormErrorMap,
  FormError,
  CheckBarSelectField
} from '@igg/common';
import { JoinFifaTournamentFormModel, FifaRoundTimeSlotModel } from '../types';
import { formatTimeslotLabel } from '../tournamentHelpers';

export interface JoinTournamentProps {
  timeSlots?: FifaRoundTimeSlotModel[];
  onSubmit: (formModel: JoinFifaTournamentFormModel) => Promise<any>;
  inProgress?: boolean;
  success?: boolean;
  formError?: string;
}

export function validateForm(form: JoinFifaTournamentFormModel) {
  const errors: FormErrorMap<JoinFifaTournamentFormModel> = {};

  if (!form.firstMatchTimeSlotIds || form.firstMatchTimeSlotIds.length < 2) {
    errors.firstMatchTimeSlotIds =
      'You need to select at least 2 time slots for the upcoming round';
  }

  return errors;
}

export function JoinFifaTournamentForm({
  timeSlots = [],
  onSubmit,
  inProgress,
  success,
  formError
}: JoinTournamentProps) {
  const timeSlotOptions = (timeSlots || []).map(ts => ({
    value: ts.id,
    label: formatTimeslotLabel(ts.startTime, ts.endTime)
  }));

  return (
    <Form onSubmit={onSubmit} validate={validateForm}>
      {({ handleSubmit, form }) => {
        return (
          <form noValidate={true} onSubmit={handleSubmit}>
            {formError && (
              <FormError title={`Error joining the tournament`}>
                {formError}
              </FormError>
            )}

            <FormElement>
              <CheckBarSelectField
                name="firstMatchTimeSlotIds"
                options={timeSlotOptions}
                multi={true}
                readonly={inProgress}
              />
            </FormElement>

            <FormActions>
              <FormActionsContent grow={true}>
                <SubmitButton
                  block={true}
                  large={true}
                  inProgress={inProgress}
                  success={success}
                  progressText="Joining..."
                  successText="Joined!"
                >
                  Join tournament
                </SubmitButton>
              </FormActionsContent>
            </FormActions>
          </form>
        );
      }}
    </Form>
  );
}
