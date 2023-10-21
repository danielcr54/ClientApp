import React from 'react';
import {
  ScreenContentHeader,
  ScreenContentHeading,
  ScreenContentSubheading,
  ScreenContentFormContainer,
  LoadingScreen
} from '@igg/common';
import {
  resolveGraphQLSubmitErrors,
  getErrorMessage
} from '../shared/errorHelpers';
import { UserInfoQuery, USER_INFO_QUERY } from '../core/UserInfoQuery';
import {
  UpdateAccountMutation,
  UpdateAccountFn
} from './UpdateAccountMutation';
import { AccountForm } from './AccountForm';
import { AccountFormModel } from './types';

export interface AccountEditScreenProps {
  formData: AccountFormModel;
  updateAccount: UpdateAccountFn;
  loading?: boolean;
  success?: boolean;
  formError?: string;
}

export function AccountEditScreen({
  formData,
  updateAccount,
  loading,
  success,
  formError
}: AccountEditScreenProps) {
  return (
    <>
      <ScreenContentHeader>
        <ScreenContentHeading>Account settings</ScreenContentHeading>
        <ScreenContentSubheading>
          You can update your email and username from here.
        </ScreenContentSubheading>
      </ScreenContentHeader>

      <ScreenContentFormContainer>
        <AccountForm
          formData={formData}
          inProgress={loading}
          formError={formError}
          success={success}
          onSubmit={formModel =>
            updateAccount({
              variables: { input: formModel },
              refetchQueries: [{ query: USER_INFO_QUERY }],
              awaitRefetchQueries: true
            }).catch(resolveGraphQLSubmitErrors)
          }
        />
      </ScreenContentFormContainer>
    </>
  );
}

export function AccountEditScreenConnected() {
  return (
    <UserInfoQuery renderLoading={() => <LoadingScreen />}>
      {userInfo => {
        return (
          <UpdateAccountMutation>
            {(updateAccount, { loading, error, data }) => {
              const success = !!(
                data &&
                data.updateAccount &&
                data.updateAccount.userInfo
              );

              return (
                <AccountEditScreen
                  formData={userInfo}
                  loading={loading}
                  success={success}
                  updateAccount={updateAccount}
                  formError={getErrorMessage(
                    error,
                    'Unknown error has happened during the operation'
                  )}
                />
              );
            }}
          </UpdateAccountMutation>
        );
      }}
    </UserInfoQuery>
  );
}

export default AccountEditScreenConnected;
