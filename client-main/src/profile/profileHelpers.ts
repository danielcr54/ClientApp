import { ProfileModel } from './types';

export function isProfileValid(profile?: ProfileModel) {
  if (!profile) return false;
  return (
    profile.avatarUrl &&
    profile.firstName &&
    profile.lastName &&
    profile.countryCode &&
    profile.language &&
    profile.dateOfBirth &&
    profile.psnUsername
  );
}
