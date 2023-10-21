import React from 'react';
import { Form } from 'react-final-form';
import {
  FormRow,
  FormCol,
  FormElement,
  FormActions,
  FormActionsContent,
  InputField,
  SelectField,
  SubmitButton,
  FormErrorMap
} from '@igg/common';
import { KycFormModel } from './types';

function validateForm(formModel: KycFormModel) {
  const errors: FormErrorMap<KycFormModel> = {};

  if (!formModel.address1) {
    errors.address1 = 'The address is required';
  }

  if (!formModel.countryCode) {
    errors.countryCode = 'Please provide your country';
  }

  if (!formModel.region) {
    errors.region = 'Please provide your region';
  }

  if (!formModel.city) {
    errors.city = 'Please provide your city';
  }

  if (!formModel.postalCode) {
    errors.postalCode = 'Please provide your postal index or zip code';
  }

  return errors;
}

export interface KycFormProps {
  formData?: KycFormModel;
  onSubmit: (KycFormModel: KycFormModel) => Promise<any>;
  onCancel?: () => void;
  inProgress?: boolean;
  success?: boolean;
  isOnboardingFlowStep?: boolean;
}

export function KycForm({
  formData,
  onSubmit,
  inProgress,
  success
}: KycFormProps) {
  return (
    <Form
      initialValues={formData}
      onSubmit={onSubmit}
      validate={validateForm}
      validateOnBlur={true}
    >
      {({ handleSubmit, submitErrors, values }) => {
        return (
          <form noValidate={true} onSubmit={handleSubmit}>
            <FormRow>
              <FormCol>
                <FormElement>
                  <InputField name="address1" label="Address line 1" />
                </FormElement>
              </FormCol>

              <FormCol>
                <FormElement>
                  <InputField
                    name="address2"
                    label="Address line 2 (optional)"
                  />
                </FormElement>
              </FormCol>
            </FormRow>

            <FormElement>
              <SelectField name="countryCode" label="Location">
                <option value="">Please select</option>
                <option value="GB">Great Britain</option>
                <option value="US">United States</option>
                <option value="RU">Russia</option>
              </SelectField>
            </FormElement>

            <FormElement>
              <InputField name="region" label="Region/County" />
            </FormElement>

            <FormElement>
              <InputField name="city" label="City" />
            </FormElement>

            <FormElement>
              <InputField name="postalCode" label="Postal code" />
            </FormElement>

            <FormActions>
              <FormActionsContent grow={true} alignEnd={true}>
                <SubmitButton
                  inProgress={inProgress}
                  success={success}
                  progressText="Submitting..."
                  successText="Submitted!"
                >
                  Submit
                </SubmitButton>
              </FormActionsContent>
            </FormActions>
          </form>
        );
      }}
    </Form>
  );
}

export default KycForm;
