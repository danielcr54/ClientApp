import React from 'react';
import {
  ScreenContentHeader,
  ScreenContentHeading,
  ScreenContentSubheading,
  ScreenContentFormContainer,
  LoadingScreen
} from '@igg/common';
import {
  resolveGraphQLSubmitErrors,
  getErrorMessage
} from '../shared/errorHelpers';
import { UserInfoQuery, USER_INFO_QUERY } from '../core/UserInfoQuery';
import {
  UpdateProfileMutation,
  UpdateProfileFn
} from './UpdateProfileMutation';
import ProfileForm from './ProfileForm';
import { ProfileModel } from './types';

// TODO: Find a better and less repetitive way

function ensureDataShape({
  avatarUrl,
  firstName,
  lastName,
  countryCode,
  language,
  dateOfBirth,
  psnUsername,
  xboxUsername,
  youTubeUrl,
  twitchUrl
}: ProfileModel) {
  return {
    avatarUrl: avatarUrl || '',
    firstName: firstName || '',
    lastName: lastName || '',
    countryCode: countryCode || '',
    language: language || '',
    dateOfBirth: dateOfBirth || '',
    psnUsername: psnUsername || '',
    xboxUsername: xboxUsername || '',
    youTubeUrl: youTubeUrl || '',
    twitchUrl: twitchUrl || ''
  };
}

export interface ProfileEditScreenProps {
  profile: ProfileModel;
  updateProfile: UpdateProfileFn;
  loading?: boolean;
  formError?: string;
  success?: boolean;
}

export function ProfileEditScreen({
  profile,
  updateProfile,
  loading,
  formError,
  success
}: ProfileEditScreenProps) {
  return (
    <>
      <ScreenContentHeader>
        <ScreenContentHeading>Edit Profile</ScreenContentHeading>
        <ScreenContentSubheading>Update your profile</ScreenContentSubheading>
      </ScreenContentHeader>

      <ScreenContentFormContainer>
        <ProfileForm
          formData={profile}
          isEdit={true}
          inProgress={loading}
          formError={formError}
          success={success}
          onSubmit={formModel =>
            updateProfile({
              variables: { input: ensureDataShape(formModel) },
              refetchQueries: [{ query: USER_INFO_QUERY }],
              awaitRefetchQueries: true
            }).catch(resolveGraphQLSubmitErrors)
          }
        />
      </ScreenContentFormContainer>
    </>
  );
}

export function ProfileEditScreenConnected() {
  return (
    <UserInfoQuery renderLoading={() => <LoadingScreen />}>
      {userInfo => {
        return (
          <UpdateProfileMutation>
            {(updateProfile, { loading, error, data }) => {
              return (
                <ProfileEditScreen
                  profile={userInfo.profile}
                  loading={loading}
                  updateProfile={updateProfile}
                  success={Boolean(data)}
                  formError={getErrorMessage(
                    error,
                    'Unknown error has happened during the operation'
                  )}
                />
              );
            }}
          </UpdateProfileMutation>
        );
      }}
    </UserInfoQuery>
  );
}

export default ProfileEditScreenConnected;
