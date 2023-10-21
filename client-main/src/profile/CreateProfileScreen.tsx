import React from 'react';
import { Redirect } from 'react-router';
import { MutationFn } from 'react-apollo';
import {
  ActionScreenLayout,
  ActionScreenHeader,
  ActionScreenHeaderStart,
  ActionScreenHeaderEnd,
  ActionScreenContentLayout,
  ActionScreenMain,
  ActionScreenFormContainer,
  ActionScreenContentHeader,
  ActionScreenHeading,
  ActionScreenSubheading,
  ActionScreenAside,
  LogoLink,
  ActionScreenLogoutLink,
  LoadingScreen
} from '@igg/common';
import { resolveGraphQLSubmitErrors } from '../shared/errorHelpers';
import { UserInfoQuery, USER_INFO_QUERY } from '../core/UserInfoQuery';
import {
  UpdateProfileMutation,
  UpdateProfileFn
} from './UpdateProfileMutation';
import { ProfileForm } from './ProfileForm';
import { isProfileValid } from './profileHelpers';
import { ProfileModel } from './types';

export interface CreateProfileScreenProps {
  profile: ProfileModel;
  updateProfile: UpdateProfileFn;
  loading?: boolean;
}

export function CreateProfileScreen({
  profile,
  updateProfile,
  loading
}: CreateProfileScreenProps) {
  const profileWithAvatar = { ...profile };
  const avatarOptions = [
    'avatar_b.png',
    'avatar_g.png',
    'avatar_p.png',
    'avatar_r.png',
    'avatar_y.png'
  ];
  profileWithAvatar.avatarUrl = `/avatars/${avatarOptions[Math.floor(Math.random() * 5)]}`;

  return (
    <ActionScreenLayout>
      <ActionScreenHeader>
        <ActionScreenHeaderStart>
          <LogoLink to="/" />
        </ActionScreenHeaderStart>
        <ActionScreenHeaderEnd>
          <ActionScreenLogoutLink to="/logout">Logout</ActionScreenLogoutLink>
        </ActionScreenHeaderEnd>
      </ActionScreenHeader>

      <ActionScreenContentLayout>
        <ActionScreenMain>
          <ActionScreenFormContainer>
            <ActionScreenContentHeader>
              <ActionScreenHeading>Create Profile</ActionScreenHeading>
              <ActionScreenSubheading>
                Build your Galactic profile to explore the IGGalaxy!
              </ActionScreenSubheading>
            </ActionScreenContentHeader>

            <ProfileForm
              formData={profileWithAvatar}
              onSubmit={formModel =>
                updateProfile({
                  variables: { input: formModel },
                  refetchQueries: [{ query: USER_INFO_QUERY }],
                  awaitRefetchQueries: true
                }).catch(resolveGraphQLSubmitErrors)
              }
              inProgress={loading}
            />
          </ActionScreenFormContainer>
        </ActionScreenMain>

        <ActionScreenAside />
      </ActionScreenContentLayout>
    </ActionScreenLayout>
  );
}

export function CreateProfileScreenConnected() {
  return (
    <UserInfoQuery renderLoading={() => <LoadingScreen />}>
      {userInfo => {
        if (isProfileValid(userInfo.profile)) {
          return <Redirect to="/" />;
        }

        return (
          <UpdateProfileMutation>
            {(updateProfile, { loading, data }) => {
              const updatedProfile =
                (data && data.updateProfile && data.updateProfile.profile) ||
                void 0;

              if (isProfileValid(updatedProfile)) {
                return <Redirect to="/" />;
              }

              return (
                <CreateProfileScreen
                  profile={userInfo.profile}
                  loading={loading}
                  updateProfile={updateProfile}
                />
              );
            }}
          </UpdateProfileMutation>
        );
      }}
    </UserInfoQuery>
  );
}

export default CreateProfileScreenConnected;
