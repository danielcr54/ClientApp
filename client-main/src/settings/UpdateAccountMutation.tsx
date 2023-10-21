import React, { ReactNode } from 'react';
import { gql } from 'apollo-boost';
import { Mutation, MutationFn, MutationResult } from 'react-apollo';
import { UserModel } from '../core/types';
import { AccountFormModel } from './types';

const UPDATE_ACCOUNT_MUTATION = gql`
  mutation UpdateAccount($input: UpdateAccountInput!) {
    updateAccount(input: $input) {
      userInfo {
        username
        email
      }
    }
  }
`;

export type UpdateAccountFn = MutationFn<
  { updateAccount: { userInfo: UserModel } },
  { input: AccountFormModel }
>;

export interface UpdateAccountMutationProps {
  children: (
    mutationFn: UpdateAccountFn,
    mutationResult: MutationResult<{ updateAccount: { userInfo: UserModel } }>
  ) => ReactNode;
}

export function UpdateAccountMutation({
  children
}: UpdateAccountMutationProps) {
  return <Mutation mutation={UPDATE_ACCOUNT_MUTATION}>{children}</Mutation>;
}

export default UpdateAccountMutation;
