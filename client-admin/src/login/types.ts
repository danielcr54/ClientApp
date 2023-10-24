export interface UserModel {
  id: string;
  username: string;
  email: string;
  isActive?: boolean;
  isEmailVerified?: boolean;
  isKycPassed?: boolean;
  isSuperuser?: boolean;
  profile: ProfileModel;
}

export interface ProfileModel {
  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
}