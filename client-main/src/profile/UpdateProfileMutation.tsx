import React, { ReactNode } from 'react';
import { gql } from 'apollo-boost';
import { Mutation, MutationFn, MutationResult } from 'react-apollo';
import { ProfileModel } from './types';

const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      profile {
        avatarUrl
        firstName
        lastName
        countryCode
        language
        dateOfBirth
        psnUsername
        xboxUsername
        youTubeUrl
        twitchUrl
        facebookUrl
        twitterUrl
        steamUsername
        discordUrl
      }
    }
  }
`;

export type UpdateProfileFn = MutationFn<
  { updateProfile: { profile: ProfileModel } },
  { input: ProfileModel }
>;

export interface UpdateProfileMutationProps {
  children: (
    mutationFn: UpdateProfileFn,
    mutationResult: MutationResult<{ updateProfile: { profile: ProfileModel } }>
  ) => ReactNode;
}

export function UpdateProfileMutation({
  children
}: UpdateProfileMutationProps) {
  return <Mutation mutation={UPDATE_PROFILE_MUTATION}>{children}</Mutation>;
}

export default UpdateProfileMutation;
