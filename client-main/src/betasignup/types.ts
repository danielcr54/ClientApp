export interface BetaState {
  isSigningUp?: boolean;
  isSignUpSuccess?: boolean;
  signUpError?: string;
  signUpValidationErrors?: any;
  recaptchaResponse?: string
}

export interface BetaFormModel {
  firstname: string;
  lastname: string;
  emailAddress: string;
  ps4: boolean;
  xbox: boolean;
  pc: boolean;
  agreeLegal: boolean;
  newsletter: boolean;
  recaptcha: string;
}
