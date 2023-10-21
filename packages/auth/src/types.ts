export interface AuthModel {
  usernameOrEmail: string;
  password: string;
  forAdminPanel?: boolean;
}
export interface PasswordResetModel {
  passwordResetToken: string;
  password: string;
}

export interface UserInfo {
  id: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  lastLoggedAt?: string;
  avatarUrl?: string;
}

export interface SessionState {
  isAuthenticating: boolean;
  authenticationError?: string;
  accessToken?: string;
  expiresAt?: number;
  expiresIn?: number;
  renewedAt?: number;
  userInfo: UserInfo | null;
}
