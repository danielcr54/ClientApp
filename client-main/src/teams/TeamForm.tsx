import React from 'react';
import styled from '@emotion/styled';
import { Form, Field } from 'react-final-form';
import {
  FormActions,
  FormActionsContent,
  FormElement,
  InputField,
  SubmitButtonWithReset,
  ButtonContentCell,
  FieldLabel,
  FieldError,
  FormError,
  FormErrorMap
} from '@igg/common';
// import UserBalanceBlock from '../shared/UserBalanceBlock';
import { ItemSingleImageInput } from '../shared/ItemSingleImageInput';
import { AdvancedSelectField } from '../shared/AdvancedSelectField';
import CountrySelectField from '../shared/CountrySelectField';
import LanguageSelectField from '../shared/LanguageSelectField';
import { TeamModel } from './types';

const SlugFieldPreviewLabel = styled(FieldLabel)({
  padding: 4,
  fontSize: 12
});

export function validateForm(formModel: TeamModel) {
  const errors: FormErrorMap<TeamModel> = {};

  if (!formModel.logoUrl) {
    errors.logoUrl = 'Please upload some logo';
  }

  if (!formModel.name) {
    errors.name = 'Team name is required';
  }

  if (!formModel.urlSlug) {
    errors.urlSlug = 'Please specify some URL slug for your team';
  }

  if (formModel.urlSlug && !/^[a-z0-9-]+$/gim.test(formModel.urlSlug)) {
    errors.urlSlug = 'Slugs can only contain letters, numbers, and hyphen(-)';
  }

  if (!formModel.countryCode) {
    errors.countryCode = "Please provide your team's location";
  }

  if (!formModel.languages || !formModel.languages.length) {
    errors.languages = 'Please choose at least one language';
  }

  if (!formModel.consoleIds || !formModel.consoleIds.length) {
    errors.consoleIds = 'Please select at least one console';
  }

  return errors;
}

export interface TeamFormProps {
  isEdit?: boolean;
  formData?: Partial<TeamModel>;
  onSubmit: (formModel: TeamModel) => Promise<any>;
  onCancel?: () => void;
  inProgress?: boolean;
  success?: boolean;
  formError?: string;
  teamCost?: number;
}

export function TeamForm({
  formData,
  isEdit,
  onSubmit,
  inProgress,
  success,
  formError,
  teamCost
}: TeamFormProps) {
  return (
    <Form initialValues={formData} onSubmit={onSubmit} validate={validateForm}>
      {({ handleSubmit }) => {
        return (
          <form noValidate={true} onSubmit={handleSubmit}>
            {formError && (
              <FormError
                title={`Error ${isEdit ? 'updating the' : 'creating a'} team`}
              >
                {formError}
              </FormError>
            )}

            <FormElement>
              <Field name="logoUrl">
                {({ input, meta }) => (
                  <>
                    <ItemSingleImageInput
                      value={input.value}
                      onChange={input.onChange}
                      meta={meta}
                      // TODO: Think about how to upload images/avatars in a generic way
                      uploadUrl="/images/upload"
                      initialLabel="Upload team logo"
                      uploadedLabel="This is how your team will appear in the IGGalaxy"
                    />
                    {meta.error && meta.submitFailed && (
                      <FieldError>{meta.error}</FieldError>
                    )}
                  </>
                )}
              </Field>
            </FormElement>

            <FormElement>
              <InputField name="name" label="Team Name" />
            </FormElement>

            <FormElement>
              <InputField name="urlSlug" label="URL slug" />
              <Field name="urlSlug">
                {({ input: { value } }) => (
                  <SlugFieldPreviewLabel>{`https://www.iggalaxy.com/teams/${value}`}</SlugFieldPreviewLabel>
                )}
              </Field>
            </FormElement>

            <FormElement>
              <CountrySelectField name="countryCode" />
            </FormElement>

            <FormElement>
              <LanguageSelectField name="languages" multiple={true} />
            </FormElement>

            <FormElement>
              <AdvancedSelectField
                name="consoleIds"
                label="Consoles"
                multiple={true}
                placeholder=""
                options={[
                  { value: 'xbox', label: 'XBOX' },
                  { value: 'ps4', label: 'PS4' }
                ]}
              />
            </FormElement>

            <FormActions>
              {/* {!isEdit && (
                <FormActionsContent grow={true}>
                  <UserBalanceBlock amount={1933} />
                </FormActionsContent>
              )} */}

              <FormActionsContent grow={true} alignEnd={true}>
                <SubmitButtonWithReset
                  inProgress={inProgress}
                  success={success}
                  progressText="Saving..."
                  successText="Saved!"
                >
                  {isEdit ? (
                    'Save'
                  ) : (
                    <>
                      <ButtonContentCell main={true}>
                        Create Team
                      </ButtonContentCell>

                      {teamCost && (
                        <ButtonContentCell>{teamCost} IGG</ButtonContentCell>
                      )}
                    </>
                  )}
                </SubmitButtonWithReset>
              </FormActionsContent>
            </FormActions>
          </form>
        );
      }}
    </Form>
  );
}

export default TeamForm;
