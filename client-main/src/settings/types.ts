export interface AccountFormModel {
  username: string;
  email: string;
}

export interface ChangePasswordModel {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
