import React from 'react';
import { Form } from 'react-final-form';
import { FaXbox, FaPlaystation } from 'react-icons/fa';
import {
  FormRow,
  FormCol,
  FormActions,
  FormActionsContent,
  FormElement,
  SubmitButtonWithReset,
  CancelButton,
  FormErrorMap,
  FormError,
  InputField,
  styleSettings
} from '@igg/common';
import { UserAddConsoleFormModel } from './types';

const { colors } = styleSettings;

export function validateForm(formModel: UserAddConsoleFormModel) {
  const errors: FormErrorMap<UserAddConsoleFormModel> = {};

  if (!formModel.psnUsername && !formModel.xboxUsername) {
    errors.psnUsername = 'Please provide either PSN username or XBOX gamertag';
  }

  return errors;
}

export interface UserAddConsoleFormProps {
  consoleIds: Array<string | undefined>;
  formData?: UserAddConsoleFormModel;
  isEdit?: boolean;
  onSubmit: (updateConsoleIdFormModel: UserAddConsoleFormModel) => Promise<any>;
  onCancel: () => void;
  inProgress?: boolean;
  success?: boolean;
  formError?: string;
}

export function UserAddConsoleForm({
  consoleIds,
  formData,
  isEdit,
  inProgress,
  success,
  onSubmit,
  onCancel,
  formError
}: UserAddConsoleFormProps) {
  return (
    <Form initialValues={formData} onSubmit={onSubmit} validate={validateForm}>
      {({ handleSubmit, submitErrors, values }) => {
        return (
          <form noValidate={true} onSubmit={handleSubmit}>
            {formError && (
              <FormError
                title={`Error ${isEdit ? 'updating' : 'adding'} a console id`}
              >
                {formError}
              </FormError>
            )}
            {consoleIds.includes('ps4') && (
              <FormRow>
                <FormCol>
                  <FormElement>
                    <InputField
                      name="psnUsername"
                      type="text"
                      label="PSN Username"
                      icon={FaPlaystation}
                      color={colors.white}
                    />
                  </FormElement>
                </FormCol>
              </FormRow>
            )}
            {consoleIds.includes('xbox') && (
              <FormRow>
                <FormCol>
                  <FormElement>
                    <InputField
                      name="xboxUsername"
                      type="text"
                      label="Xbox Username"
                      icon={FaXbox}
                      color={colors.white}
                    />
                  </FormElement>
                </FormCol>
              </FormRow>
            )}

            <FormActions>
              <FormActionsContent grow={true} alignEnd={false}>
                <CancelButton onClick={() => onCancel()}>CANCEL</CancelButton>
              </FormActionsContent>
              <FormActionsContent grow={true} alignEnd={true}>
                <SubmitButtonWithReset
                  inProgress={inProgress}
                  success={success}
                  progressText="Processing..."
                  successText="Done"
                  secondary={true}
                >
                  ADD CONSOLE
                </SubmitButtonWithReset>
              </FormActionsContent>
            </FormActions>
          </form>
        );
      }}
    </Form>
  );
}

export default UserAddConsoleForm;
