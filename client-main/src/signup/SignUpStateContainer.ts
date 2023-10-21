import axios from 'axios';
import { Container } from 'unstated';
import { config } from '../config';
import {
  toSubmitErrors,
  defaultValidationMessage
} from '../shared/errorHelpers';
import { SignUpState, EmailVerificationModel, SignUpFormModel } from './types';

export const DEFAULT_STATE = {
  isSigningUp: false,
  isSignUpSuccess: false,
  signUpError: void 0,
  signUpValidationErrors: void 0,
  isVerifyingEmail: false,
  isVerifyEmailSuccess: false,
  verifyEmailError: '',
  isSendingLink: false,
  isLinkResendSuccess: false,
  linkResendError: ''
};

const httpClient = axios.create({
  baseURL: config.apiUrl,
  headers: {
    Accept: 'application/json'
  }
});

export class SignUpStateContainer extends Container<SignUpState> {
  state = DEFAULT_STATE;

  signUp = (formModel: SignUpFormModel) => {
    this.setState({ isSigningUp: true });

    return httpClient
      .post('/signup', formModel)
      .then(this.signUpSuccess)
      .catch(this.signUpError);
  };

  signUpSuccess = (response: any) => {
    const newState = {
      ...this.state,
      isSigningUp: false,
      isSignUpSuccess: true,
      signUpError: void 0,
      signUpValidationErrors: void 0
    };

    console.log('[signup] Successfully signed up');
    this.setState(newState);
  };

  signUpError = (requestError: any) => {
    const data =
      requestError && requestError.response && requestError.response.data;

    const validationErrors =
      (data && data.errors && toSubmitErrors(data.errors)) || void 0;

    const errorMessage = validationErrors
      ? defaultValidationMessage
      : (data && data.message) || 'Generic error';

    console.log(`[auth] Failed signing up: ${errorMessage}`);
    this.setState({
      isSigningUp: false,
      signUpError: errorMessage,
      signUpValidationErrors: validationErrors
    });

    return Promise.reject(validationErrors);
  };

  // Email verification

  verifyEmail = (model: EmailVerificationModel) => {
    return httpClient
      .get(`/signup/verify/${model.emailVerificationToken}`)
      .then(() => {
        this.setState({ isVerifyingEmail: false, isVerifyEmailSuccess: true });
      })
      .catch((requestError: any) => {
        const errorMessage =
          (requestError &&
            requestError.response &&
            requestError.response.data &&
            requestError.response.data.message) ||
          'Error verifying email';

        this.setState({
          isVerifyingEmail: false,
          isVerifyEmailSuccess: false,
          verifyEmailError: errorMessage
        });
      });
  };

  resendVerificationLink = (usernameOrEmail: string) => {
    this.setState({ isSendingLink: true, isLinkResendSuccess: false });

    return httpClient
      .post('/signup/verify/resend', {
        usernameOrEmail
      })
      .then(() => {
        this.setState({ isSendingLink: false, isLinkResendSuccess: true });
      })
      .catch((requestError: any) => {
        const errorMessage =
          (requestError &&
            requestError.response &&
            requestError.response.data &&
            requestError.response.data.message) ||
          'Error resending a verification link';

        this.setState({
          isSendingLink: false,
          isLinkResendSuccess: false,
          linkResendError: errorMessage
        });
      });
  };
}

export default SignUpStateContainer;
