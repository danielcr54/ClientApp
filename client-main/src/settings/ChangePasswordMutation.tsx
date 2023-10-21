import React, { ReactNode } from 'react';
import { gql } from 'apollo-boost';
import { Mutation, MutationFn, MutationResult } from 'react-apollo';
import { ChangePasswordModel } from './types';

const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      success
    }
  }
`;

export type ChangePasswordFn = MutationFn<
  { changePassword: { success: boolean } },
  { input: ChangePasswordModel }
>;

export interface ChangePasswordMutationProps {
  children: (
    mutationFn: ChangePasswordFn,
    mutationResult: MutationResult<{ changePassword: { success: boolean } }>
  ) => ReactNode;
}

export function ChangePasswordMutation({
  children
}: ChangePasswordMutationProps) {
  return <Mutation mutation={CHANGE_PASSWORD_MUTATION}>{children}</Mutation>;
}

export default ChangePasswordMutation;
