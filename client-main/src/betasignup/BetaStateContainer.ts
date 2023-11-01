import axios from 'axios';
import { Container } from 'unstated';
import { config } from 'config';
import {
  toSubmitErrors,
  defaultValidationMessage
} from '../shared/errorHelpers';
import { BetaState, BetaFormModel } from './types';

export const DEFAULT_STATE = {
  isSigningUp: false,
  isSignUpSuccess: false,
  signUpError: void 0,
  signUpValidationErrors: void 0,
  recaptchaResponse: ""
};

const httpClient = axios.create({
  baseURL: config.apiUrl,
  headers: {
    Accept: 'application/json'
  }
});

export class BetaStateContainer extends Container<BetaState> {
  state = DEFAULT_STATE;

  signUp = (formModel: BetaFormModel, recaptchaResponse: string) => {
    this.setState({ isSigningUp: true });
    console.log(recaptchaResponse)
    formModel.recaptcha = recaptchaResponse

    return httpClient
      .post('/beta/signup', formModel)
      .then(this.signUpSuccess)
      .catch(this.signUpError);
  };

  signUpSuccess = (response: any) => {
    const newState = {
      ...this.state,
      isSigningUp: false,
      isSignUpSuccess: true,
      signUpError: void 0,
      signUpValidationErrors: void 0,
      recaptchaResponse: ""
    };

    console.log('[signup] Successfully signed up');
    this.setState(newState);
  };

  signUpError = (requestError: any) => {
    const data =
      requestError && requestError.response && requestError.response.data;

    const validationErrors =
      (data && data.errors && toSubmitErrors(data.errors)) || void 0;

    let errorMessage = validationErrors
      ? defaultValidationMessage
      : (data && data.message) || 'Generic error';

    if (data.errors[0].field === "recaptchaValid") {
      errorMessage = "Captcha validation failed";
    }

    console.log(`[auth] Failed signing up: ${errorMessage}`);
    this.setState({
      isSigningUp: false,
      signUpError: errorMessage,
      signUpValidationErrors: validationErrors
    });

    return Promise.reject(validationErrors);
  };
}

export default BetaStateContainer;
