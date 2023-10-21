export interface ProfileModel {
  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
  countryCode?: string;
  language?: string;
  dateOfBirth?: string;
  psnUsername?: string;
  xboxUsername?: string;
  youTubeUrl?: string;
  twitchUrl?: string;
}

export interface UserAddConsoleFormModel {
  psnUsername?: string;
  xboxUsername?: string;
}
