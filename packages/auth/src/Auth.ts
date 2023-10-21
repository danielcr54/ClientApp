import axios from 'axios';
import { AuthModel, UserInfo, PasswordResetModel } from './types';
import { config } from './config';

const httpClient = axios.create({
  baseURL: config.authApiUrl
});

export class Auth {
  login = (authModel: AuthModel) => {
    return httpClient.post('/auth/login', authModel);
  };

  logout = (accessToken?: string) => {
    if (!accessToken) return Promise.resolve();

    return httpClient.post('/auth/login/revoke', void 0, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  };

  getUserInfo = (accessToken: string): Promise<UserInfo> => {
    return httpClient
      .get('/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => response.data);
  };

  requestPasswordRecovery = (usernameOrEmail: string) => {
    return httpClient
      .post('/auth/password-recovery', {
        usernameOrEmail
      })
      .then(response => response.data)
      .catch(errorResponse =>
        Promise.reject(
          (errorResponse.response.data &&
            errorResponse.response.data.message) ||
            'Password recovery failed for some reason.'
        )
      );
  };

  resetPassword = (passwordResetModel: PasswordResetModel) => {
    return httpClient
      .post('/auth/password-reset', passwordResetModel)
      .then(response => response.data)
      .catch(errorResponse =>
        Promise.reject(
          (errorResponse.response.data &&
            errorResponse.response.data.message) ||
            'Password reset failed for some reason.'
        )
      );
  };
}

export default Auth;
