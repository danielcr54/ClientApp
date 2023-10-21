import { Container } from 'unstated';
import {
  SessionStateStorage,
  DefaultSessionStateStorage
} from './SessionStateStorage';
import { Auth } from './Auth';
import { UserInfo, SessionState, AuthModel, PasswordResetModel } from './types';

const AUTH_RENEW_INTERVAL = 60 * 60 * 1000; // 1 hour

export const DEFAULT_SESSION_STATE = {
  isAuthenticating: false,
  authenticationError: '',
  accessToken: void 0,
  expiresAt: void 0,
  expiresIn: void 0,
  renewedAt: void 0,
  userInfo: null
};

export class SessionStateContainer extends Container<SessionState> {
  constructor(
    private auth: Auth = new Auth(),
    private sessionStateStorage: SessionStateStorage = new DefaultSessionStateStorage()
  ) {
    super();
    this.state = this.sessionStateStorage.load() || DEFAULT_SESSION_STATE;
  }

  isAuthenticating() {
    return this.state.isAuthenticating;
  }

  isAuthenticated = (): boolean => {
    const { accessToken, expiresAt } = this.state;
    const now = new Date().getTime();
    const authenticated =
      (accessToken && (expiresAt ? now < expiresAt : true)) || false;
    if (authenticated) {
      this.renewCurrentAuth();
    }
    return authenticated;
  };

  renewCurrentAuth = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      const { expiresAt, expiresIn, renewedAt } = this.state;
      const now = new Date().getTime();
      if (
        expiresAt &&
        expiresIn &&
        renewedAt &&
        renewedAt < now - AUTH_RENEW_INTERVAL
      ) {
        const newState = {
          ...this.state,
          expiresAt: now + expiresIn,
          renewedAt: now
        };
        this.sessionStateStorage.save(newState);
        return resolve(this.setState(newState));
      } else {
        resolve(null);
      }
    });
  };

  login = (authModel: AuthModel) => {
    this.setState({ isAuthenticating: true });

    return this.auth
      .login(authModel)
      .then(this.loginSuccess)
      .catch(this.loginError);
  };

  loginSuccess = (authResponse: any) => {
    // Set the absolute time that the access token will expire at
    // using relative "expired in" value
    const now = new Date().getTime();
    const authData = authResponse.data;
    const expiresIn = authData.expiresIn;
    const newState = {
      ...this.state,
      isAuthenticating: false,
      accessToken: authData.accessToken,
      expiresIn,
      expiresAt: now + expiresIn,
      renewedAt: now
    };

    console.log('[auth] Successfully authenticated');
    this.sessionStateStorage.save(newState);
    this.setState(newState);
  };

  loginError = (requestError: any) => {
    // this.sessionStateStorage.clear();
    // this.setState({ ...DEFAULT_SESSION_STATE });
    const errorMessage =
      (requestError &&
        requestError.response &&
        requestError.response.data &&
        requestError.response.data.message) ||
      'Generic authentication error';

    console.log(`[auth] Failed authenticating: ${errorMessage}`);
    this.setState({
      isAuthenticating: false,
      authenticationError: errorMessage
    });
  };

  getUserInfo = (sessionState: SessionState): Promise<UserInfo | null> => {
    const { accessToken } = sessionState;
    console.log(sessionState);
    return accessToken
      ? this.auth.getUserInfo(accessToken)
      : Promise.reject('No valid access token');
  };

  async logout() {
    await this.auth.logout();
    this.sessionStateStorage.clear();
    this.setState({ ...DEFAULT_SESSION_STATE });
    console.log('[auth] User has been logged out');
  }

  // Password recovery

  requestPasswordRecovery = (usernameOrEmail: string) => {
    return this.auth.requestPasswordRecovery(usernameOrEmail);
  };

  resetPassword = (passwordResetModel: PasswordResetModel) => {
    return this.auth.resetPassword(passwordResetModel);
  };
}

export default SessionStateContainer;
