import React from 'react';
import { Form, Field } from 'react-final-form';
import { FaTwitch, FaYoutube, FaXbox, FaPlaystation } from 'react-icons/fa';
import {
  FormRow,
  FormCol,
  FormActions,
  FormActionsContent,
  FormElement,
  SubmitButtonWithReset,
  FormErrorMap,
  FormError,
  FieldError,
  InputField,
  DateInputField,
  validationHelpers
} from '@igg/common';
import { ItemSingleImageInput } from '../shared/ItemSingleImageInput';
import CountrySelectField from '../shared/CountrySelectField';
import LanguageSelectField from '../shared/LanguageSelectField';
import { ProfileModel } from './types';

const { isDateStringValid } = validationHelpers;
const DATE_OF_BIRTH_FORMAT = 'DD/MM/YYYY';

export function validateForm(formModel: ProfileModel) {
  const errors: FormErrorMap<ProfileModel> = {};

  if (!formModel.firstName) {
    errors.firstName = 'First name is required';
  }

  if (!formModel.lastName) {
    errors.lastName = 'Last name is required';
  }

  if (!formModel.countryCode) {
    errors.countryCode = 'Please provide your location';
  }

  if (!formModel.language) {
    errors.language = 'Please let us know your spoken language';
  }

  if (!formModel.dateOfBirth) {
    errors.dateOfBirth = 'Please let us know your date of birth';
  } else if (!isDateStringValid(formModel.dateOfBirth)) {
    errors.dateOfBirth = `The date of birth should be in a "${DATE_OF_BIRTH_FORMAT}" format`;
  }

  if (!formModel.psnUsername && !formModel.xboxUsername) {
    errors.psnUsername = 'Please provide either PSN username or XBOX gamertag';
  }

  return errors;
}

export interface ProfileFormProps {
  formData?: ProfileModel;
  isEdit?: boolean;
  onSubmit: (profileFormModel: ProfileModel) => Promise<any>;
  onCancel?: () => void;
  inProgress?: boolean;
  success?: boolean;
  formError?: string;
}

export function ProfileForm({
  formData,
  isEdit,
  inProgress,
  success,
  onSubmit,
  formError
}: ProfileFormProps) {
  return (
    <Form initialValues={formData} onSubmit={onSubmit} validate={validateForm}>
      {({ handleSubmit, submitErrors, values }) => {
        return (
          <form noValidate={true} onSubmit={handleSubmit}>
            {formError && (
              <FormError
                title={`Error ${isEdit ? 'updating' : 'creating'} a profile`}
              >
                {formError}
              </FormError>
            )}

            <FormElement>
              <Field name="avatarUrl">
                {({ input, meta }) => (
                  <>
                    <ItemSingleImageInput
                      value={input.value}
                      onChange={input.onChange}
                      meta={meta}
                      uploadUrl="/profile/avatar/upload"
                      initialLabel="Upload an avatar"
                      uploadedLabel="Your avatar in the IGGalaxy"
                      imageShape="circle"
                    />
                    {meta.error && meta.submitFailed && (
                      <FieldError>{meta.error}</FieldError>
                    )}
                  </>
                )}
              </Field>
            </FormElement>

            <FormRow>
              <FormCol>
                <FormElement>
                  <InputField
                    name="firstName"
                    type="text"
                    label="First Name"
                    placeholder="John"
                  />
                </FormElement>
              </FormCol>

              <FormCol>
                <FormElement>
                  <InputField
                    name="lastName"
                    type="text"
                    label="Last Name"
                    placeholder="Doe"
                  />
                </FormElement>
              </FormCol>
            </FormRow>

            <FormRow>
              <FormCol>
                <FormElement>
                  <CountrySelectField name="countryCode" />
                </FormElement>
              </FormCol>

              <FormCol>
                <FormElement>
                  <LanguageSelectField name="language" />
                </FormElement>
              </FormCol>
            </FormRow>

            <FormElement>
              <DateInputField
                name="dateOfBirth"
                type="text"
                label="Date of Birth"
                placeholder={DATE_OF_BIRTH_FORMAT}
              />
            </FormElement>

            <FormRow>
              <FormCol>
                <FormElement>
                  <InputField
                    name="psnUsername"
                    type="text"
                    label="PSN ID"
                    icon={FaPlaystation}
                  />
                </FormElement>
              </FormCol>

              <FormCol>
                <FormElement>
                  <InputField
                    name="xboxUsername"
                    type="text"
                    label="Xbox Gamertag"
                    icon={FaXbox}
                  />
                </FormElement>
              </FormCol>
            </FormRow>

            {/* <FormElement>
              <InputField
                name="youTubeUrl"
                type="text"
                label="YouTube Stream Link (optional)"
                icon={FaYoutube}
              />
            </FormElement>

            <FormElement>
              <InputField
                name="twitchUrl"
                type="text"
                label="Twitch Stream Link (optional)"
                icon={FaTwitch}
              />
            </FormElement> */}

            <FormActions>
              <FormActionsContent grow={true} alignEnd={true}>
                <SubmitButtonWithReset
                  inProgress={inProgress}
                  success={success}
                  progressText={
                    isEdit ? 'Updating Profile...' : 'Creating Profile...'
                  }
                  successText={isEdit ? 'Profile Updated!' : 'Profile Created!'}
                  children={isEdit ? 'Save' : 'Launch!'}
                />
              </FormActionsContent>
            </FormActions>
          </form>
        );
      }}
    </Form>
  );
}

export default ProfileForm;
