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
import { FifaRoundTimeSlotFormModel, FifaRoundTimeSlotModel } from '../types';
import { formatTimeslotLabel } from '../tournamentHelpers';

export interface FifaRoundTimeSlotFormProps {
  label?: string;
  timeSlots?: FifaRoundTimeSlotModel[];
  onSubmit: (formModel: FifaRoundTimeSlotFormModel) => Promise<any>;
  inProgress?: boolean;
  success?: boolean;
  formError?: string;
}

export function validateForm(form: FifaRoundTimeSlotFormModel) {
  const errors: FormErrorMap<FifaRoundTimeSlotFormModel> = {};

  if (!form.roundTimeSlotIds || form.roundTimeSlotIds.length < 2) {
    errors.roundTimeSlotIds =
      'You need to select at least 2 time slots for the upcoming round';
  }

  return errors;
}

export function FifaRoundTimeSlotForm({
  label,
  timeSlots = [],
  onSubmit,
  inProgress,
  success,
  formError
}: FifaRoundTimeSlotFormProps) {
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
              <FormError title={`Error confirming the time`}>
                {formError}
              </FormError>
            )}

            <FormElement>
              <CheckBarSelectField
                name="roundTimeSlotIds"
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
                  progressText="Confirming..."
                  successText="Confirmed!"
                >
                  {label}
                </SubmitButton>
              </FormActionsContent>
            </FormActions>
          </form>
        );
      }}
    </Form>
  );
}
