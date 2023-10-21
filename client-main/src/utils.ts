import { AccountFormModel } from './settings/types';

export function cleanAccountFormModel(accountFormModel: AccountFormModel) {
  return {
    username: accountFormModel.username,
    email: accountFormModel.email
  };
};