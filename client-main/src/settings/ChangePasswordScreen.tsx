import React from 'react';
import {
  ScreenContentHeader,
  ScreenContentHeading,
  ScreenContentSubheading,
  ScreenContentFormContainer
} from '@igg/common';
import {
  resolveGraphQLSubmitErrors,
  getErrorMessage
} from '../shared/errorHelpers';
import {
  ChangePasswordMutation,
  ChangePasswordFn
} from './ChangePasswordMutation';
import { ChangePasswordForm } from './ChangePasswordForm';
import { ChangePasswordModel } from './types';

export interface ChangePasswordScreenProps {
  changePassword: ChangePasswordFn;
  loading?: boolean;
  success?: boolean;
  formError?: string;
}

export function ChangePasswordScreen({
  changePassword,
  loading,
  success,
  formError
}: ChangePasswordScreenProps) {
  return (
    <>
      <ScreenContentHeader>
        <ScreenContentHeading>Change Password</ScreenContentHeading>
        <ScreenContentSubheading>
          Please provide your current password
        </ScreenContentSubheading>
      </ScreenContentHeader>

      <ScreenContentFormContainer>
        <ChangePasswordForm
          inProgress={loading}
          formError={formError}
          success={success}
          onSubmit={formModel =>
            changePassword({
              variables: { input: formModel }
            }).catch(resolveGraphQLSubmitErrors)
          }
        />
      </ScreenContentFormContainer>
    </>
  );
}

export function ChangePasswordScreenConnected() {
  return (
    <ChangePasswordMutation>
      {(changePassword, { loading, error, data }) => {
        return (
          <ChangePasswordScreen
            loading={loading}
            success={data && data.changePassword && data.changePassword.success}
            changePassword={changePassword}
            formError={getErrorMessage(
              error,
              'Unknown error has happened during the operation'
            )}
          />
        );
      }}
    </ChangePasswordMutation>
  );
}

export default ChangePasswordScreenConnected;
