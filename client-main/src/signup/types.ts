export interface SignUpState {
  isSigningUp?: boolean;
  isSignUpSuccess?: boolean;
  signUpError?: string;
  signUpValidationErrors?: any;
  isVerifyingEmail?: boolean;
  isVerifyEmailSuccess?: boolean;
  verifyEmailError?: string;
  isSendingLink?: boolean;
  isLinkResendSuccess?: boolean;
  linkResendError?: string;
}

export interface EmailVerificationModel {
  emailVerificationToken: string;
}

export interface SignUpFormModel {
  username: string;
  email: string;
  password: string;
  underage: boolean;
  termsConfirmed: boolean;
}
